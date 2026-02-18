const LINKS = {
  resumePdf: "resume.pdf", // upload resume.pdf into repo root
  linkedin: "https://www.linkedin.com/in/sai-k-853685143/",
  email: "Saidivyak280@gmail.com"
};

document.getElementById("year").textContent = new Date().getFullYear();

// Buttons
document.getElementById("resumeBtn").href = LINKS.resumePdf;

const liBtn = document.getElementById("linkedinBtn");
liBtn.href = LINKS.linkedin;
liBtn.target = "_blank";
liBtn.rel = "noopener noreferrer";

const liBtn2 = document.getElementById("linkedinBtn2");
liBtn2.href = LINKS.linkedin;

document.getElementById("liText").textContent = LINKS.linkedin;

document.getElementById("emailText").textContent = LINKS.email;
const emailBtn = document.getElementById("emailBtn");
emailBtn.href = `mailto:${encodeURIComponent(LINKS.email)}?subject=${encodeURIComponent("Senior .NET Role Inquiry")}`;

// Mobile nav
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
hamburger.addEventListener("click", () => {
  const open = mobileNav.style.display === "block";
  mobileNav.style.display = open ? "none" : "block";
  hamburger.setAttribute("aria-expanded", open ? "false" : "true");
  mobileNav.setAttribute("aria-hidden", open ? "true" : "false");
});
mobileNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileNav.style.display = "none";
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

// Render projects
async function loadProjects() {
  const grid = document.getElementById("projectsGrid");
  try {
    const res = await fetch("projects.json");
    const data = await res.json();

    grid.innerHTML = data.projects.map(p => `
      <article class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <p class="muted tiny">${escapeHtml(p.dates || "")}</p>
        <p class="muted">${escapeHtml(p.description || "")}</p>
        ${p.tech?.length ? `<div class="tags">${p.tech.map(t => `<span>${escapeHtml(t)}</span>`).join("")}</div>` : ""}
        ${p.link ? `<div style="margin-top:12px;"><a class="btn btn--sm btn--ghost" href="${p.link}" target="_blank" rel="noopener">View</a></div>` : ""}
      </article>
    `).join("");
  } catch {
    grid.innerHTML = `<div class="card"><h3>Projects not loaded</h3><p class="muted">Make sure <code>projects.json</code> exists in the repo root.</p></div>`;
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

loadProjects();
