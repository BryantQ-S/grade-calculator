# Grade Calculator — Automated CI/CD Pipeline

A React + Vite Grade Calculator web application integrated with a full DevOps pipeline using **GitHub**, **Jenkins Multibranch Pipelines**, **SonarQube**, and **Docker**.

---

## 1. Local Setup & Execution

### Prerequisites

- Node.js (v20 or v24 recommended)
- Docker Desktop running locally

### Run & Test Locally

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com
   cd grade-calculator
   npm install
   ```
2. Run the automated unit test suite (Vitest):
   ```bash
   npm test
   ```
3. Generate the code coverage report (LCOV + text summary):
   ```bash
   npm run coverage
   ```
4. Build the production static bundle (`dist/`):
   ```bash
   npm run build
   ```

---

## 2. Jenkins & SonarQube Infrastructure

### Start SonarQube & Jenkins Containers

```bash
# Start SonarQube on port 9000
docker run -d --name sonarqube -p 9000:9000 sonarqube:community

# Start Jenkins on port 8080 with Docker CLI access
docker run -d --name jenkins --user root -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

### SonarQube Quality Gate Configuration

- **Project Key:** `grade-calculator` (configured via `sonar-project.properties`)
- **Coverage Report:** Imported from `coverage/lcov.info`
- **Quality Gate Rule:** Overall code coverage must be **at least 80%** (`Coverage < 80%` fails the gate and aborts the CI pipeline).

---

## 3. Branching Strategy & CI Pipeline (`Jenkinsfile`)

The `GradeCalc-CI` **Multibranch Pipeline** automatically discovers and builds branches using branch-specific rules:

| Branch          | Stages Executed                                                                                                                                                                               |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`feature/*`** | Checkout → Install Dependencies → Unit Tests → Code Coverage                                                                                                                                  |
| **`develop`**   | Checkout → Install Dependencies → Unit Tests → Code Coverage → Production Build                                                                                                               |
| **`main`**      | Checkout → Install Dependencies → Unit Tests → Code Coverage → SonarQube Analysis → Quality Gate (`>= 80%`) → Production Build → Archive Release Artifact (`react-app-<BUILD_NUMBER>.tar.gz`) |

- Any failure in unit tests, coverage thresholds, or the SonarQube Quality Gate immediately halts the pipeline and prevents artifact packaging.

---

## 4. Parameterized CD Pipeline (`Jenkinsfile.cd`)

The `GradeCalc-CD` pipeline deploys an already-built, immutable release artifact from `GradeCalc-CI/main` without rebuilding the React source code.

### Parameters

- **`CI_BUILD_NUMBER`**: The successful build number from `GradeCalc-CI/main` to deploy.
- **`ENVIRONMENT`**: Target deployment environment mapped to isolated container names and ports:
  - `DEV` → `http://localhost:8081`
  - `TEST` → `http://localhost:8082`
  - `ACC` → `http://localhost:8083`
  - `PROD` → `http://localhost:8084`

---

## 5. Dependency Security Audit (`npm audit`)

Running `npm audit` against the project dependencies confirms:

- **Result:** `found 0 vulnerabilities` across all production and development packages.
- If vulnerabilities are detected in future updates, they are triaged by severity and resolved using `npm audit fix` or targeted dependency upgrades before merging to `main`.
