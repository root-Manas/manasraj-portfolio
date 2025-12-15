/**
 * Blog System - Loads markdown posts from the /blog folder
 */

// Blog posts configuration
const POSTS = [
    {
        slug: 'antenna-wave-propagation',
        title: 'Why learning antennas might save you from getting hacked',
        date: '2024-08-31',
        description: 'Antennas are the unsung heroes of our wireless world. From nature\'s bioelectric fields to quantum concepts, understanding them is key to defending against signal interception and spoofing.'
    },
    {
        slug: 'PPF-model',
        title: 'Silicon vs. Code: The USA\'s Dilemma of Tech Dominance',
        date: '2024-06-01',
        description: 'Analyzing the shift from semiconductor manufacturing to software development in the US economy using the Production Possibilities Frontier (PPF) economic model.'
    },
    {
        slug: 'cron_jobs_to_priviliage_esc',
        title: 'Cron Jobs to Privilege Escalation',
        date: '2024-05-09',
        description: 'A walk-through of a CTF challenge where a forgotten cron job led to root access. Learn why cleaning up old automation scripts is critical for system security.'
    }
];

// Format date for display
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Render blog posts list
function renderBlogPosts() {
    const container = document.getElementById('blog-posts');
    
    if (POSTS.length === 0) {
        container.innerHTML = `
            <div class="no-posts">
                <p>No blog posts yet. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const postsHTML = sortedPosts.map(post => `
        <article class="blog-post" onclick="openPost('${post.slug}')">
            <div class="blog-date">${formatDate(post.date)}</div>
            <div class="blog-content">
                <h3>${post.title}</h3>
                <p>${post.description}</p>
            </div>
        </article>
    `).join('');
    
    container.innerHTML = postsHTML;
}

// Open a blog post
function openPost(slug) {
    // Navigate to the markdown file for now
    // In a real implementation you'd want a proper reader page
    window.location.href = `blog/${slug}.md`;
}

// Initialize blog system
document.addEventListener('DOMContentLoaded', () => {
    // Only render blog posts if the container exists
    if (document.getElementById('blog-posts')) {
        renderBlogPosts();
    }
    
    // Smooth scroll for navigation
    document.querySelectorAll('nav a, .logo').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only for hash links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
