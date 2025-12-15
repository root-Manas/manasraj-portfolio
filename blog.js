/**
 * Blog System - Loads markdown posts from the /blog folder
 * 
 * To add a new blog post:
 * 1. Create a new .md file in the /blog folder
 * 2. Add to the POSTS array below with: slug, title, date, description
 * 3. The post will automatically appear in the blog section
 */

// Blog posts configuration - Add your posts here
const POSTS = [
    {
        slug: 'getting-started',
        title: 'Hello World - Getting Started with Security Research',
        date: '2025-12-15',
        description: 'An introduction to my journey in security research and what to expect from this blog.'
    }
    // Add more posts here like:
    // {
    //     slug: 'post-filename-without-md',
    //     title: 'Your Post Title',
    //     date: 'YYYY-MM-DD',
    //     description: 'A brief description of the post.'
    // }
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

// Open a blog post (for future implementation)
function openPost(slug) {
    // For now, just navigate to the markdown file
    // In a more advanced setup, this could open a modal or new page
    window.location.href = `blog/${slug}.md`;
}

// Initialize blog system
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();

    // Smooth scroll for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
