// app/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import Table from '@/components/dashboard/Table';
import SearchFilter from '@/components/dashboard/SearchFilter';
import Pagination from '@/components/dashboard/Pagination';
import { fetchPosts, filterPosts, paginatePosts, getTotalPages } from '@/models/postsModel';

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Load initial data
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    if (posts.length > 0) {
      const filtered = filterPosts(posts, searchTerm);
      setFilteredPosts(filtered);
      setCurrentPage(1); // Reset to first page when filter changes
    }
  }, [searchTerm, posts]);

  // Calculate pagination
  const totalPages = getTotalPages(filteredPosts.length, postsPerPage);
  const currentPosts = paginatePosts(filteredPosts, currentPage, postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Posts</h2>
          <SearchFilter 
            searchTerm={searchTerm} 
            onSearchChange={handleSearchChange} 
          />
        </div>
        
        <Table 
          posts={currentPosts} 
          loading={loading} 
          error={error} 
        />
        
        {!loading && !error && filteredPosts.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
      </div>
    </div>
  );
}