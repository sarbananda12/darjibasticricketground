document.addEventListener('DOMContentLoaded', function () {
  /* Responsive Navigation Toggle */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', function () {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  /* Dark/Light Mode Toggle */
  const modeToggle = document.getElementById('mode-toggle');
  modeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    // Optionally, change the toggle button icon/text
    if (document.body.classList.contains('dark-mode')) {
      modeToggle.textContent = '☀️';
    } else {
      modeToggle.textContent = '🌙';
    }
  });

  /* Countdown Timer Implementation */
  const timerElement = document.getElementById('timer');
  const targetDate = new Date('March 31, 2025 15:45:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      timerElement.textContent = "Match Started!";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  /* Simulated Live Score Widget */
  const liveScoreWidget = document.getElementById('live-score-widget');
  let liveScore = {
    Kukurakhaiti: 0,
    Darjibasti: 0,
    overs: 0
  };

  function updateLiveScore() {
    liveScore.teamA += Math.floor(Math.random() * 3);
    liveScore.teamB += Math.floor(Math.random() * 3);
    liveScore.overs += 0.1;
    let oversInt = Math.floor(liveScore.overs);
    let balls = Math.floor((liveScore.overs - oversInt) * 10);
    if (balls >= 6) {
      oversInt++;
      balls = 0;
      liveScore.overs = oversInt;
    }
    liveScoreWidget.innerHTML = `<p>Kukurakhaiti: ${liveScore.Kukurakhaiti} - Darjibasti: ${liveScore.Darjibasti}</p>
      <p>Overs: ${oversInt}.${balls}</p>`;
  }
  setInterval(updateLiveScore, 5000);
  updateLiveScore();

  /* Modal Functionality for Player Stats */
  const playerCards = document.querySelectorAll('.stat-card');
  const playerModal = document.getElementById('playerModal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalRuns = document.getElementById('modal-runs');
  const modalWickets = document.getElementById('modal-wickets');
  const modalMatches = document.getElementById('modal-matches-played');

  playerCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('h3').textContent;
      const stats = card.querySelectorAll('p');
      modalTitle.textContent = name;
      modalRuns.textContent = stats[0].textContent;
      modalWickets.textContent = stats[1].textContent;
      modalMatches.textContent = stats[2].textContent;
      playerModal.style.display = 'flex';
      playerModal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', closeModal);
  playerModal.addEventListener('click', function (e) {
    if (e.target === playerModal) {
      closeModal();
    }
  });

  function closeModal() {
    playerModal.style.display = 'none';
    playerModal.setAttribute('aria-hidden', 'true');
  }

  /* Contact Form Validation */
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you for contacting us!');
    contactForm.reset();
  });

  /* Past Matches Functionality */
  const pastMatchesContainer = document.getElementById('past-matches-container');
  
  // Example past matches data
  const pastMatches = [
    {
      title: "Match 1 - Darjibasti vs Kukurakhaiti",
      date: "28-03-2025",
      time: "3:45 PM",
      venue: "Darjibasti Cricket Playground",
      summary: "Darjibasti won by 6 wickets. Top performer: Rohit Singh with 75 runs."
    },
    {
      title: "Match 2 - Darjibasti vs Kukurakhaiti",
      date: "27-03-2025",
      time: "4:00 PM",
      venue: "Darjibasti Cricket Playground",
      summary: "A thrilling finish with Kukurakhaiti securing a narrow win. Top bowler: OM Prakash Koiri with 4 wickets."
    }
    // You can add more matches as needed.
  ];

  function renderPastMatches() {
    pastMatches.forEach(match => {
      const matchCard = document.createElement('div');
      matchCard.classList.add('match-card', 'expandable');
      
      // Basic match info
      matchCard.innerHTML = `
        <h3>${match.title}</h3>
        <p>Date: ${match.date}</p>
        <p>Time: ${match.time}</p>
        <p>Venue: ${match.venue}</p>
        <div class="match-details">
          <p>${match.summary}</p>
        </div>
      `;
      
      // Toggle details when clicking the match card
      matchCard.addEventListener('click', function () {
        const details = matchCard.querySelector('.match-details');
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
      });
      
      pastMatchesContainer.appendChild(matchCard);
    });
  }
  
  renderPastMatches();
});
