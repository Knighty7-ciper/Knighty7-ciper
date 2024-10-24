// index.ts

// Function to create the header
function createHeader(): string {
  return `
    <header style="text-align: center;">
      <img src="https://capsule-render.vercel.app/api?type=waving&color=7A92B8&height=100&section=header" />
      <h1 style="text-shadow: 0 0 20px rgba(255, 255, 255, 0.7); animation: glow 1.5s ease-in-out infinite alternate;">👋 Hi there, I'm Keenan!</h1>
      <a href="https://github.com/kyle2000">
        <img src="https://readme-typing-svg.herokuapp.com?color=%2300FF00&size=22&lines=Hello+World!+I+Am+Keenan.;AI+Enthusiast+%26+ML+Developer.;Lifelong+Tech+Learner!" width="500" height="50" />
      </a>
    </header>
  `;
}

// Function to create sections for GitHub stats
function createGitHubStats(): string {
  return `
    <section style="text-align: center;">
      <div style="border: 2px solid; animation: rainbow 3s linear infinite; padding: 10px; margin: 20px; border-radius: 10px;">
        <p>GitHub Stats:</p>
        <img src="https://github-readme-stats.vercel.app/api?username=kyleBrian&show_icons=true&theme=radical" alt="GitHub Stats" />
      </div>
      <div style="border: 2px solid; animation: rainbow 3s linear infinite; padding: 10px; margin: 20px; border-radius: 10px;">
        <p>GitHub Streak:</p>
        <a href="https://github.com/kyleBrian">
          <img src="https://github-readme-streak-stats.herokuapp.com?user=kyleBrian&theme=tokyonight&hide_border=false" alt="GitHub Streak" />
        </a>
      </div>
      <div style="border: 2px solid; animation: rainbow 3s linear infinite; padding: 10px; margin: 20px; border-radius: 10px;">
        <p>Achievements:</p>
        <img src="https://github-profile-trophy.vercel.app/?username=kyleBrian&theme=juicyfresh&margin-w=15&margin-h=15" alt="GitHub Achievements" />
      </div>
      <div style="border: 2px solid; animation: rainbow 3s linear infinite; padding: 10px; margin: 20px; border-radius: 10px;">
        <p>GitHub Skyline:</p>
        <a href="https://skyline.github.com/kyleBrian/2023">
          <img src="https://skyline.github.com/kyleBrian/2023" alt="GitHub Skyline" width="100%" />
        </a>
      </div>
    </section>
  `;
}

// Function to create social media icons
function createSocialMediaLinks(): string {
  return `
    <div>
      <h3>Connect with me:</h3>
      <a href="https://instagram.com/instagram.com.reza.205" target="_blank">
        <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="Instagram" height="30" width="40" />
      </a>
      <a href="https://www.youtube.com/c/https://youtube.com/@rezdv4" target="_blank">
        <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="YouTube" height="30" width="40" />
      </a>
    </div>
  `;
}

// Function to create languages and tools section
function createLanguagesAndTools(): string {
  const languages = [
    { name: 'Angular', link: 'https://angular.io', img: 'https://angular.io/assets/images/logos/angular/angular.svg' },
    { name: 'Bootstrap', link: 'https://getbootstrap.com', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg' },
    { name: 'CSS3', link: 'https://www.w3schools.com/css/', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg' },
    { name: 'Python', link: 'https://www.python.org/', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
    { name: 'Java', link: 'https://www.java.com/', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg' },
    { name: 'Ruby', link: 'https://www.ruby-lang.org/en/', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg' },
    { name: 'MongoDB', link: 'https://www.mongodb.com/', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg' },
  ];

  return `
    <div>
      <h3>Languages and Tools:</h3>
      ${languages.map(lang => `
        <a href="${lang.link}" target="_blank" rel="noreferrer">
          <img src="${lang.img}" alt="${lang.name}" width="40" height="40" />
        </a>
      `).join('')}
    </div>
  `;
}

// Function to create the footer
function createFooter(): string {
  return `
    <footer>
      <img src="https://capsule-render.vercel.app/api?type=waving&color=4a6e8f&height=100&section=footer" />
    </footer>
  `;
}

// Function to render the complete page
function renderProfilePage(): void {
  const profileHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Keenan's Animated GitHub Profile</title>
      <style>
        body {
          background: linear-gradient(120deg, #3498db, #8e44ad);
          color: white;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        /* Add your CSS animations and styles here */
      </style>
    </head>
    <body>
      ${createHeader()}
      ${createGitHubStats()}
      ${createSocialMediaLinks()}
      ${createLanguagesAndTools()}
      ${createFooter()}
    </body>
    </html>
  `;

  // This is where you would inject the profileHTML into your webpage
  document.body.innerHTML = profileHTML;
}

// Call the function to render the profile page
renderProfilePage();
