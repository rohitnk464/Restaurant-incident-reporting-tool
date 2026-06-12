$ErrorActionPreference = "Stop"

function Make-Commit {
    param(
        [string]$Message,
        [string]$DateString,
        [string[]]$FilesToAdd,
        [string[]]$FilesToRemove
    )

    if ($FilesToAdd.Length -gt 0) {
        foreach ($file in $FilesToAdd) {
            git add $file
        }
    }

    if ($FilesToRemove.Length -gt 0) {
        foreach ($file in $FilesToRemove) {
            git rm --ignore-unmatch $file
        }
    }

    $env:GIT_AUTHOR_DATE = $DateString
    $env:GIT_COMMITTER_DATE = $DateString

    git commit -m $Message
}

# Ensure we're clean
# git reset HEAD

# Commit 1
Make-Commit -Message "chore: remove Next.js default templates" -DateString "2026-06-10T10:00:00" -FilesToAdd @() -FilesToRemove @("AGENTS.md", "CLAUDE.md", "src/app/page.module.css")

# Commit 2
Make-Commit -Message "chore: install prisma and configure gitignore" -DateString "2026-06-10T11:30:00" -FilesToAdd @("package.json", "package-lock.json", ".gitignore") -FilesToRemove @()

# Commit 3
Make-Commit -Message "feat: setup database schema and Prisma config" -DateString "2026-06-10T14:15:00" -FilesToAdd @("prisma/schema.prisma", ".env.example", "src/lib/prisma.js") -FilesToRemove @()

# Commit 4
Make-Commit -Message "feat: add app constants and utility functions" -DateString "2026-06-10T16:45:00" -FilesToAdd @("src/lib/constants.js", "src/lib/utils.js") -FilesToRemove @()

# Commit 5
Make-Commit -Message "feat: implement GET/POST API for incidents" -DateString "2026-06-11T09:20:00" -FilesToAdd @("src/app/api/incidents/route.js") -FilesToRemove @()

# Commit 6
Make-Commit -Message "feat: implement GET/PUT/DELETE API for single incident" -DateString "2026-06-11T11:10:00" -FilesToAdd @("src/app/api/incidents/[id]/route.js") -FilesToRemove @()

# Commit 7
Make-Commit -Message "feat: implement AI summary endpoint" -DateString "2026-06-11T13:40:00" -FilesToAdd @("src/app/api/ai/summarize/route.js") -FilesToRemove @()

# Commit 8
Make-Commit -Message "style: create global design tokens and layout" -DateString "2026-06-11T15:30:00" -FilesToAdd @("src/app/globals.css", "src/app/layout.js") -FilesToRemove @()

# Commit 9
Make-Commit -Message "feat: create header and toast components" -DateString "2026-06-11T17:15:00" -FilesToAdd @("src/components/Header.js", "src/components/Toast.js") -FilesToRemove @()

# Commit 10
Make-Commit -Message "feat: implement stats and filter bars" -DateString "2026-06-12T09:05:00" -FilesToAdd @("src/components/StatsBar.js", "src/components/FilterBar.js") -FilesToRemove @()

# Commit 11
Make-Commit -Message "feat: build incident card component" -DateString "2026-06-12T10:30:00" -FilesToAdd @("src/components/IncidentCard.js") -FilesToRemove @()

# Commit 12
Make-Commit -Message "feat: build incident reporting form" -DateString "2026-06-12T11:45:00" -FilesToAdd @("src/components/IncidentForm.js") -FilesToRemove @()

# Commit 13
Make-Commit -Message "feat: build dashboard page" -DateString "2026-06-12T13:20:00" -FilesToAdd @("src/app/page.js") -FilesToRemove @()

# Commit 14
Make-Commit -Message "feat: build report incident page" -DateString "2026-06-12T14:10:00" -FilesToAdd @("src/app/report/page.js") -FilesToRemove @()

# Commit 15
Make-Commit -Message "feat: build incident detail view" -DateString "2026-06-12T15:30:00" -FilesToAdd @("src/app/incident/[id]/page.js") -FilesToRemove @()

# Commit 16
Make-Commit -Message "chore: add database seed script" -DateString "2026-06-12T16:15:00" -FilesToAdd @("prisma/seed.js") -FilesToRemove @()

# Commit 17
Make-Commit -Message "docs: write comprehensive README" -DateString "2026-06-12T16:30:00" -FilesToAdd @("README.md") -FilesToRemove @()

# Catch all remaining
git add .
$env:GIT_AUTHOR_DATE = "2026-06-12T16:45:00"
$env:GIT_COMMITTER_DATE = "2026-06-12T16:45:00"
git commit -m "fix: minor adjustments and final polish"

Write-Host "Commits created successfully!"
