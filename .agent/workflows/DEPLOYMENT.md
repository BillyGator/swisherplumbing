---
description: This workflow outlines the critical steps required to deploy updates to the Swisher Plumbing website. It ensures that the production build is always updated before pushing changes.
---

# Swisher Plumbing Website Deployment Workflow

This site is a React application built with Vite. The live website is served from the `/dist` folder, which contains the compiled production assets.
**IMPORTANT:** Changes made to the `src/` folder will NOT appear on the live site until they are built into `/dist`.

**Follow these steps for every deployment:**

1.  Make your code edits in the `src/` directory as usual.

2.  **Build the Production Site:**
    Before committing, you MUST run the build command to update the `/dist` folder.
    ```bash
    npm run build
    ```
    *(Note: If you encounter execution policy errors on Windows, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm run build`)*

3.  **Verify the Build:**
    Check that the `dist/` folder has been updated (files should have new modified timestamps).

4.  **Stage All Changes (Including Dist):**
    Ensure you add both your source changes AND the updated `dist` folder.
    ```bash
    git add .
    ```

5.  **Commit and Push:**
    ```bash
    git commit -m "Update site and rebuild for deployment"
    git push origin main
    ```

**Troubleshooting:**
*   **"My changes aren't showing up!"**: You probably forgot to run `npm run build` or forgot to `git add dist` before pushing. Run the build, commit the `dist` folder, and push again.
