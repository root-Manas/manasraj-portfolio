# How to Add Blog Posts

## Quick Steps

1. **Create a markdown file** in the `/blog` folder:
   ```
   blog/your-post-slug.md
   ```

2. **Add your post** to the `POSTS` array in `blog.js`:
   ```javascript
   {
       slug: 'your-post-slug',      // Must match your .md filename (without .md)
       title: 'Your Post Title',
       date: '2025-12-15',          // YYYY-MM-DD format
       description: 'Brief description shown in the list'
   }
   ```

3. **Refresh the page** — your post will appear in the Blog section.

---

## Example

### Step 1: Create `blog/osint-techniques.md`
```markdown
# OSINT Techniques for Security Research

Introduction paragraph...

## Section 1
Content here...

## Conclusion
Wrap up...
```

### Step 2: Edit `blog.js`
```javascript
const POSTS = [
    {
        slug: 'getting-started',
        title: 'Hello World - Getting Started',
        date: '2025-12-15',
        description: 'An introduction to my journey...'
    },
    {
        slug: 'osint-techniques',  // NEW POST
        title: 'OSINT Techniques for Security Research',
        date: '2025-12-16',
        description: 'Exploring open-source intelligence methods.'
    }
];
```

---

## Notes
- Posts are sorted by date (newest first)
- Clicking a post opens the raw `.md` file
- Use standard Markdown formatting in your posts
