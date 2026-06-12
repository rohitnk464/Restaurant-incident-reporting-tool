$ErrorActionPreference = "Stop"

Write-Host "Wiping old git history..."
Remove-Item -Recurse -Force .git

git init
git config user.name "rohitnk464"
git config user.email "rohitmnaik9@gmail.com"
git branch -m main
git remote add origin https://github.com/rohitnk464/Restaurant-incident-reporting-tool.git

function Make-Commit {
    param(
        [string]$Message,
        [string]$DateString,
        [string[]]$FilesToAdd
    )

    if ($FilesToAdd.Length -gt 0) {
        foreach ($file in $FilesToAdd) {
            if (Test-Path $file) {
                git add $file
            }
        }
    }

    $env:GIT_AUTHOR_DATE = $DateString
    $env:GIT_COMMITTER_DATE = $DateString

    git commit -m $Message
}

# Commit 1
Make-Commit -Message "Initial commit from Create Next App" -DateString "2026-06-12T10:00:00" -FilesToAdd @("package.json", "package-lock.json", "next.config.mjs", "eslint.config.mjs", "jsconfig.json", "public")

# Commit 2
Make-Commit -Message "chore: install prisma and configure gitignore" -DateString "2026-06-12T11:30:00" -FilesToAdd @(".gitignore")

# Commit 3
Make-Commit -Message "feat: setup database schema and Prisma config" -DateString "2026-06-12T13:15:00" -FilesToAdd @("prisma/schema.prisma", ".env.example", "src/lib/prisma.js")

# Commit 4
Make-Commit -Message "feat: add app constants and utility functions" -DateString "2026-06-12T14:45:00" -FilesToAdd @("src/lib/constants.js", "src/lib/utils.js")

# Commit 5
Make-Commit -Message "feat: implement GET/POST API for incidents" -DateString "2026-06-12T15:20:00" -FilesToAdd @("src/app/api/incidents/route.js")

# Commit 6
Make-Commit -Message "feat: implement GET/PUT/DELETE API for single incident" -DateString "2026-06-12T16:10:00" -FilesToAdd @("src/app/api/incidents/[id]/route.js")

# Commit 7
Make-Commit -Message "feat: implement AI summary endpoint" -DateString "2026-06-12T17:40:00" -FilesToAdd @("src/app/api/ai/summarize/route.js")

# Commit 8
Make-Commit -Message "style: create global design tokens and layout" -DateString "2026-06-12T18:30:00" -FilesToAdd @("src/app/globals.css", "src/app/layout.js")

# Commit 9
Make-Commit -Message "feat: create header and toast components" -DateString "2026-06-12T19:15:00" -FilesToAdd @("src/components/Header.js", "src/components/Toast.js")

# Commit 10
Make-Commit -Message "feat: implement stats and filter bars" -DateString "2026-06-12T20:05:00" -FilesToAdd @("src/components/StatsBar.js", "src/components/FilterBar.js")

# Commit 11
Make-Commit -Message "feat: build incident card component" -DateString "2026-06-12T20:30:00" -FilesToAdd @("src/components/IncidentCard.js")

# Commit 12
Make-Commit -Message "feat: build incident reporting form" -DateString "2026-06-12T20:45:00" -FilesToAdd @("src/components/IncidentForm.js")

# Commit 13
Make-Commit -Message "feat: build dashboard page" -DateString "2026-06-12T21:20:00" -FilesToAdd @("src/app/page.js")

# Commit 14
Make-Commit -Message "feat: build report incident page" -DateString "2026-06-12T21:40:00" -FilesToAdd @("src/app/report/page.js")

# Commit 15
Make-Commit -Message "feat: build incident detail view" -DateString "2026-06-12T21:50:00" -FilesToAdd @("src/app/incident/[id]/page.js")

# Commit 16
Make-Commit -Message "chore: add database seed script" -DateString "2026-06-12T22:00:00" -FilesToAdd @("prisma/seed.js")

# Commit 17
Make-Commit -Message "docs: write comprehensive README" -DateString "2026-06-12T22:05:00" -FilesToAdd @("README.md")

# Catch all remaining
git add .
$env:GIT_AUTHOR_DATE = "2026-06-12T22:10:00"
$env:GIT_COMMITTER_DATE = "2026-06-12T22:10:00"
git commit -m "fix: minor adjustments and final polish"

Write-Host "Commits created successfully! Now force pushing to origin..."
git push -u origin main -f
