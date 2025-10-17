/**
 * update_xp.js
 * Node.js script for Knighty7: Tech Coder Sim XP updater
 *
 * - Requires: npm install @octokit/rest dayjs
 * - Expects env: GH_TOKEN (a personal access token with repo scope)
 *
 * The script:
 *  - fetches repos and commits,
 *  - tallies language bytes per repo,
 *  - estimates recent commits (last 24 hours),
 *  - computes XP per language and overall,
 *  - writes human-readable progress and replaces placeholders in README.md
 */

const fs = require('fs');
const path = require('path');
const { Octokit } = require("@octokit/rest");
const dayjs = require("dayjs");

const USERNAME = "Knighty7-ciper";
const README_PATH = path.join(process.cwd(), "README.md");

if (!process.env.GH_TOKEN) {
  console.error("Error: GH_TOKEN env var not set.");
  process.exit(1);
}

const octokit = new Octokit({ auth: process.env.GH_TOKEN });

// Simple XP rules (Tech Coder Sim)
const XP_PER_COMMIT = 5;
const XP_PER_PR_MERGED = 10;
const XP_PER_REPO_CONTRIB = 2;

function barFromPercent(pct, length=20) {
  const filled = Math.round((pct/100)*length);
  return "▰".repeat(filled) + "▱".repeat(Math.max(0, length-filled)) + ` ${Math.round(pct)}%`;
}

async function fetchRepos() {
  const repos = [];
  for await (const response of octokit.paginate.iterator(octokit.rest.repos.listForUser, { username: USERNAME, per_page: 100 })) {
    repos.push(...response.data);
  }
  return repos;
}

async function fetchRecentCommitsCount(sinceIso) {
  // We'll check each repo for commits by the user since 'sinceIso'
  let total = 0;
  const repos = await fetchRepos();
  for (const r of repos) {
    try {
      const commits = await octokit.rest.repos.listCommits({
        owner: r.owner.login,
        repo: r.name,
        since: sinceIso,
        author: USERNAME,
        per_page: 1
      });
      if (commits && commits.data && commits.data.length > 0) {
        // GitHub API doesn't return exact counts easily without extra requests; approximate with length of page
        total += commits.data.length;
      }
    } catch (e) {
      // ignore private/fork access issues
    }
  }
  return total;
}

async function computeLanguageScores(repos) {
  const langBytes = {};
  for (const r of repos) {
    try {
      const langs = await octokit.rest.repos.listLanguages({ owner: r.owner.login, repo: r.name });
      for (const [lang, bytes] of Object.entries(langs.data || {})) {
        langBytes[lang] = (langBytes[lang] || 0) + bytes;
      }
    } catch (e) {
      // skip
    }
  }
  return langBytes;
}

async function main() {
  const since = dayjs().subtract(1, 'day').toISOString();
  const repos = await fetchRepos();
  const recentCommits = await fetchRecentCommitsCount(since);
  const langBytes = await computeLanguageScores(repos);

  // Top languages by bytes
  const sortedLangs = Object.entries(langBytes).sort((a,b) => b[1]-a[1]).slice(0,6);
  const totalBytes = Object.values(langBytes).reduce((s,v)=>s+v,0) || 1;

  // Compute XP per language proportional to bytes
  const langXP = {};
  for (const [lang, bytes] of sortedLangs) {
    const pct = (bytes / totalBytes) * 100;
    const xp = Math.round(pct * 0.6); // scale factor
    langXP[lang] = { xp, pct };
  }

  // XP from commits
  const commitXP = recentCommits * XP_PER_COMMIT;

  // Aggregate total xp (naive)
  const totalLanguageXP = Object.values(langXP).reduce((s, v)=>s+v.xp, 0);
  const totalXP = totalLanguageXP + commitXP + (repos.length * XP_PER_REPO_CONTRIB);

  // Construct progress bars
  const progressBar = barFromPercent(Math.min(100, totalXP % 100));

  // Recent powerups simple text
  const recentLines = [
    `+${commitXP} XP from ${recentCommits} commits`,
    `+${Math.round(totalLanguageXP)} XP distributed across top languages`,
    `+${repos.length * XP_PER_REPO_CONTRIB} XP from ${repos.length} repos scanned`
  ];

  // Language rows for README
  function langRow(lang, info) {
    const pct = info.pct;
    const xp = info.xp;
    const rank = Math.min(99, Math.round(pct));
    return { lang, xp, rank, bar: barFromPercent(Math.min(100, info.pct)) };
  }

  const langRows = sortedLangs.map(([lang, bytes]) => langRow(lang, langXP[lang]));

  // Read README and replace placeholders
  let md = fs.readFileSync(README_PATH, "utf8");

  const now = dayjs().format("YYYY-MM-DD HH:mm:ss");

  md = md.replace("{{DATE}}", now);
  md = md.replace("{{TOTAL_XP}}", String(totalXP));
  md = md.replace("{{LEVEL}}", String(Math.floor(totalXP / 100)));
  md = md.replace("{{STREAK}}", String(0)); // placeholder (streak logic can be added)
  md = md.replace("{{PROGRESS_BAR}}", progressBar);
  md = md.replace("{{RECENT_POWERUPS}}", recentLines.join("\n"));

  // Fill language template values (best-effort; if not present, skip)
  const langMap = {
    PYTHON_XP: "Python",
    JS_XP: "JavaScript",
    WEB_XP: "HTML/CSS",
    SQL_XP: "SQL",
    AI_XP: "AI / ML"
  };

  // Default values
  const defaults = {
    PYTHON_XP: "0", PYTHON_RANK: "-", PYTHON_BAR: "▱".repeat(20)+" 0%",
    JS_XP: "0", JS_RANK: "-", JS_BAR: "▱".repeat(20)+" 0%",
    WEB_XP: "0", WEB_RANK: "-", WEB_BAR: "▱".repeat(20)+" 0%",
    SQL_XP: "0", SQL_RANK: "-", SQL_BAR: "▱".repeat(20)+" 0%",
    AI_XP: "0", AI_RANK: "-", AI_BAR: "▱".repeat(20)+" 0%"
  };

  // Assign top languages to slots
  for (let i=0;i<Math.min(langRows.length,5);i++) {
    const r = langRows[i];
    switch(i) {
      case 0:
        md = md.replace("{{PYTHON_XP}}", String(r.xp));
        md = md.replace("{{PYTHON_RANK}}", String(r.rank));
        md = md.replace("{{PYTHON_BAR}}", r.bar);
        break;
      case 1:
        md = md.replace("{{JS_XP}}", String(r.xp));
        md = md.replace("{{JS_RANK}}", String(r.rank));
        md = md.replace("{{JS_BAR}}", r.bar);
        break;
      case 2:
        md = md.replace("{{WEB_XP}}", String(r.xp));
        md = md.replace("{{WEB_RANK}}", String(r.rank));
        md = md.replace("{{WEB_BAR}}", r.bar);
        break;
      case 3:
        md = md.replace("{{SQL_XP}}", String(r.xp));
        md = md.replace("{{SQL_RANK}}", String(r.rank));
        md = md.replace("{{SQL_BAR}}", r.bar);
        break;
      case 4:
        md = md.replace("{{AI_XP}}", String(r.xp));
        md = md.replace("{{AI_RANK}}", String(r.rank));
        md = md.replace("{{AI_BAR}}", r.bar);
        break;
    }
  }

  // Replace any remaining placeholders with defaults
  for (const [k,v] of Object.entries(defaults)) {
    md = md.replace(`{{${k}}}`, v);
  }

  // Insert a log entry into the auto-generated data zone
  const entryLines = [
    `[${dayjs().format("YYYY-MM-DD")}] +${commitXP} XP (commits) | +${Math.round(totalLanguageXP)} XP (languages) | TotalXP ${totalXP}`
  ];
  md = md.replace(/<!-- \{XP_LOG_START\} -->[\s\S]*?<!-- \{XP_LOG_END\} -->/m,
    `<!-- {XP_LOG_START} -->\n${entryLines.join("\n")}\n<!-- {XP_LOG_END} -->`);

  fs.writeFileSync(README_PATH, md, "utf8");

  console.log("README.md updated successfully.");
}

main().catch(err => {
  console.error("Error in update_xp:", err);
  process.exit(1);
});
