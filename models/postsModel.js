// models/postsModel.js
export async function fetchPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }
  
  export function filterPosts(posts, filter) {
    if (!filter) return posts;
    
    const searchTerm = filter.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) || 
      post.id.toString().includes(searchTerm)
    );
  }
  
  export function paginatePosts(posts, page, itemsPerPage = 5) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return posts.slice(startIndex, endIndex);
  }
  
  export function getTotalPages(totalItems, itemsPerPage = 5) {
    return Math.ceil(totalItems / itemsPerPage);
  }