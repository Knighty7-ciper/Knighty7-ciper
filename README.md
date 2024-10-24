<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keenan's Animated GitHub Profile</title>

  <style>
    /* Glowing Animations for the Header */
    h1 {
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
      animation: glow 1.5s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
      }
      to {
        text-shadow: 0 0 20px rgba(255, 255, 255, 1);
      }
    }

    /* Gradient Background for Sections */
    body {
      background: linear-gradient(120deg, #3498db, #8e44ad);
      color: white;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    /* Neon Glow around Icons */
    .icon:hover {
      filter: drop-shadow(0 0 5px #00e6e6) drop-shadow(0 0 10px #00e6e6);
    }

    /* Hover Animations for Language Icons */
    img:hover {
      transform: scale(1.2);
      transition: 0.3s ease-in-out;
    }

    /* Dynamic Rainbow Borders */
    @keyframes rainbow {
      0% { border-color: #ff003c; }
      25% { border-color: #ff8a00; }
      50% { border-color: #4bd964; }
      75% { border-color: #2f74c0; }
      100% { border-color: #d400ff; }
    }

    div {
      border: 2px solid;
      animation: rainbow 3s linear infinite;
      padding: 10px;
      margin: 20px;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <!-- Wave Header -->
  <img src="https://capsule-render.vercel.app/api?type=waving&color=7A92B8&height=100&section=header">

  <!-- Glowing Header Text -->
  <h1>👋 Hi there, I'm Keenan!</h1>

  <!-- Typing Animation -->
  <a href="https://github.com/kyle2000">
    <img src="https://readme-typing-svg.herokuapp.com?color=%2300FF00&size=22&lines=Hello+World!+I+Am+Keenan.;AI+Enthusiast+%26+ML+Developer.;Lifelong+Tech+Learner!&center=true&width=500&height=50">
  </a>

  <!-- GitHub Stats with a Wave Background -->
  <div>
    <p>GitHub Stats:</p>
    <img src="https://github-readme-stats.vercel.app/api?username=kyleBrian&show_icons=true&theme=radical" alt="GitHub Stats">
  </div>

  <!-- GitHub Streak -->
  <div>
    <p>GitHub Streak:</p>
    <a href="https://github.com/kyleBrian">
      <img src="https://github-readme-streak-stats.herokuapp.com?user=kyleBrian&theme=tokyonight&hide_border=false" alt="GitHub Streak">
    </a>
  </div>

  <!-- GitHub Achievements -->
  <div>
    <p>Achievements:</p>
    <img src="https://github-profile-trophy.vercel.app/?username=kyleBrian&theme=juicyfresh&margin-w=15&margin-h=15" alt="GitHub Achievements">
  </div>

  <!-- GitHub Skyline -->
  <div>
    <p>GitHub Skyline:</p>
    <a href="https://skyline.github.com/kyleBrian/2023">
      <img src="https://skyline.github.com/kyleBrian/2023" alt="GitHub Skyline" width="100%">
    </a>
  </div>

  <!-- Custom Animated GIF for GitHub Activity -->
  <div>
    <p>GitHub Activity GIF:</p>
    <img src="https://media.giphy.com/media/1BGY4m5Rs7ZfqjDFiR/giphy.gif" width="300">
  </div>

  <!-- Social Media Icons with Neon Glow -->
  <div>
    <h3>Connect with me:</h3>
    <a href="https://instagram.com/instagram.com.reza.205" target="blank">
      <img class="icon" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="Instagram" height="30" width="40" />
    </a>
    <a href="https://www.youtube.com/c/https://youtube.com/@rezdv4" target="blank">
      <img class="icon" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="YouTube" height="30" width="40" />
    </a>
  </div>

  <!-- Tools and Languages with Hover Effects -->
  <div>
    <h3>Languages and Tools:</h3>
    <a href="https://angular.io" target="_blank" rel="noreferrer"> 
      <img class="icon" src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> 
    </a>
    <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> 
      <img class="icon" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> 
    </a>
    <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> 
      <img class="icon" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> 
    </a>
  </div>

  <!-- Wave Footer -->
  <img src="https://capsule-render.vercel.app/api?type=waving&color=4a6e8f&height=100&section=footer">
</body>
</html>
