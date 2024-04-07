// BlogPage.js
import React, { useState,useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import BlogModal from '../components/BlogModal';
// import image1 from './images/image1.jpg';
// import image2 from './images/image2.jpg';

const BlogPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const [articles, setArticles] = useState([]);

    useEffect(() => {
      // Fetch property data from PostgreSQL database
      fetchArticles();
    }, []);
  
    const fetchArticles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/students/getposts`);
        if (response.status === 200) {
          const data = await response.json();
          setArticles(data);
          console.log(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="blog-page">
      <h1 className="text-3xl font-bold text-center my-8 text-white">Welcome to our Blog!</h1>
      <div className="flex flex-wrap justify-center">
        {articles.map(article => (
          <BlogCard key={article.id} article={article}/>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
