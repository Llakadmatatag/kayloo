document.addEventListener('DOMContentLoaded', function() {
    // Check stream status when page loads
    checkStreamStatus();
    // Check every 5 minutes
    setInterval(checkStreamStatus, 300000);
    
    // Function to check stream status
    async function checkStreamStatus() {
        const indicator = document.getElementById('liveIndicator');
        if (!indicator) return;
        
        try {
            // Note: This is a placeholder implementation
            // In a real-world scenario, you would need to use Kick's API or a server-side solution
            // to check the actual stream status due to CORS restrictions
            
            // For demo purposes, we'll simulate a check
            // In production, replace this with an actual API call to your backend
            // that checks the Kick.com API
            const isLive = await simulateKickApiCheck('kayloo444');
            
            if (isLive) {
                indicator.classList.remove('offline');
                indicator.classList.add('online');
                indicator.setAttribute('title', 'Stream is live!');
            } else {
                indicator.classList.remove('online');
                indicator.classList.add('offline');
                indicator.setAttribute('title', 'Stream is offline');
            }
        } catch (error) {
            console.error('Error checking stream status:', error);
            indicator.classList.remove('online');
            indicator.classList.add('offline');
            indicator.setAttribute('title', 'Error checking status');
        }
    }
    
    // Simulate Kick API check (replace with actual API call in production)
    async function simulateKickApiCheck(username) {
        // In a real implementation, you would make an API call here
        // For example: const response = await fetch(`/api/check-stream?username=${username}`);
        // return response.json().isLive;
        
        // For demo purposes, return false (offline) by default
        // In a real implementation, you would check the actual stream status
        return false;
    }
    
    // Original DOMContentLoaded code continues...
    // Set active link based on current URL
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Navigation active state
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath || 
            (currentPath === 'index.html' && link.textContent.trim().toLowerCase() === 'home')) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 3D Card Hover Effect
    const cards = document.querySelectorAll('.partner-card');
    
    cards.forEach(card => {
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
        
        // 3D effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position relative to card center
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Update CSS variables
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
            
            // Parallax effect for logo
            const logo = card.querySelector('.partner-logo');
            if (logo) {
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                logo.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
    
    // Button press effect
    const buttons = document.querySelectorAll('.nav-link, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(4px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
