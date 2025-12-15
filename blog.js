/**
 * Blog System - Loads markdown posts from the /blog folder
 */

// Blog posts configuration
const POSTS = [
    {
        slug: 'antenna-wave-propagation',
        title: 'Antenna Theory and Wave Propagation: Fundamentals for Security Researchers',
        date: '2024-06-05',
        description: 'A dive into the physics of RF communications, antenna design, and the implications for wireless security and signals intelligence.'
    },
    {
        slug: 'PPF-model',
        title: 'The Zero-Sum Silicon Game: Analyzing US Tech Dominance via the PPF Model',
        date: '2024-06-01',
        description: 'An economic analysis of the trade-offs between semiconductor manufacturing and software development using the Production Possibilities Frontier framework.'
    },
    {
        slug: 'cron_jobs_to_priviliage_esc',
        title: 'Cron Jobs and Privilege Escalation: Mechanics and Mitigation',
        date: '2024-05-09',
        description: 'An analysis of misconfigured cron jobs as a vector for privilege escalation in Linux environments.'
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
    if (!container) return;

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
    window.location.href = `post.html?slug=${slug}`;
}

// Load and render a specific post (for post.html)
async function loadPost(slug) {
    const container = document.getElementById('article-content');
    if (!container) return;

    try {
        const response = await fetch(`blog/${slug}.md`);
        if (!response.ok) throw new Error('Post not found');

        const markdown = await response.text();

        // Parse Frontmatter
        const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
        const match = markdown.match(frontmatterRegex);

        let content = markdown;
        let metadata = {};

        if (match) {
            // Remove frontmatter from content
            content = markdown.replace(frontmatterRegex, '').trim();

            // Parse metadata (simple key-value parser)
            const fmLines = match[1].split('\n');
            fmLines.forEach(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    let value = parts.slice(1).join(':').trim();
                    // Remove quotes if present
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }
                    metadata[key] = value;
                }
            });
        }

        document.title = `${metadata.title || 'Blog Post'} - Manas`;

        const html = `
            <header class="post-header">
                <span class="post-date">${formatDate(metadata.pubDate || new Date())}</span>
                <h1 class="post-title">${metadata.title || 'Untitled'}</h1>
            </header>
            <div class="post-content">
                ${marked.parse(content)}
            </div>
        `;

        container.innerHTML = html;

    } catch (error) {
        console.error('Error loading post:', error);
        container.innerHTML = `
            <div class="error">
                <h2>Post Not Found</h2>
                <p>The blog post you're looking for doesn't exist or could not be loaded.</p>
                <a href="archive.html" class="back-link" style="justify-content: center; margin-top: 24px;">Back to Archive</a>
            </div>
        `;
    }
}

// Initialize blog system
document.addEventListener('DOMContentLoaded', () => {
    // Render posts list if container exists
    if (document.getElementById('blog-posts')) {
        renderBlogPosts();
    }

    // Smooth scroll for navigation (only on main page with hash links)
    document.querySelectorAll('nav a, .logo').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.includes('#') && !href.startsWith('http')) {
                // If we're not on the index page and link is to a section
                if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
                    // Let default behavior happen (navigation to index.html#section from index.html)
                    return;
                }

                // If we are on index page
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
});
