import { useState, useEffect } from 'react';

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // بيانات البلوجات
  const blogs = [
    {
      id: 1,
      img: '/imgs/blog/b1.jpg',
      title: 'The Cotton-Jersey Zip-Up Hoodie',
      description: 'Kickstarter man braid godard coloring book. Raclette waistcoast selfies yr wolf chartreuse hexagon irony, goadard...',
      date: '13/01'
    },
    {
      id: 2,
      img: '/imgs/blog/b2.jpg',
      title: 'How to Style a Quiff',
      description: 'Kickstarter man braid godard coloring book. Raclette waistcoast selfies yr wolf chartreuse hexagon irony, goadard...',
      date: '13/01'
    },
    {
      id: 3,
      img: '/imgs/blog/b3.jpg',
      title: 'Must-Have Skater Girl Items',
      description: 'Kickstarter man braid godard coloring book. Raclette waistcoast selfies yr wolf chartreuse hexagon irony, goadard...',
      date: '13/01'
    },
    {
      id: 4,
      img: '/imgs/blog/b4.jpg',
      title: 'Runway-Inspired Trends',
      description: 'Kickstarter man braid godard coloring book. Raclette waistcoast selfies yr wolf chartreuse hexagon irony, goadard...',
      date: '13/01'
    },
    {
      id: 5,
      img: '/imgs/blog/b5.jpg',
      title: 'AW20 Menswear Trends',
      description: 'Kickstarter man braid godard coloring book. Raclette waistcoast selfies yr wolf chartreuse hexagon irony, goadard...',
      date: '13/01'
    },
  ];

  const blogsPerPage = 5;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    // حساب البلوجات للصفحة الحالية
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    setFilteredBlogs(blogs.slice(startIndex, endIndex));
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* Landing Section */}
      <section id="page-header" className="blog-header">
        <h2>#readmore</h2>
        <p>Read all case studies about our products!</p>
      </section>

      {/* Blog Posts */}
      <section id="blog">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="blog-box">
            <div className="blog-img">
              <img src={blog.img} alt={blog.title} />
            </div>
            <div className="blog-details">
              <h4>{blog.title}</h4>
              <p>{blog.description}</p>
              <a href="#">CONTINUE READING</a>
            </div>
            <h1>{blog.date}</h1>
          </div>
        ))}
      </section>

      {/* Pagination */}
      <section id="pagination" className="section-p1">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
          className={currentPage === 1 ? 'disabled' : ''}
        >
          ←
        </a>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <a
            key={page}
            href="#"
            onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </a>
        ))}

        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
          className={currentPage === totalPages ? 'disabled' : ''}
        >
          →
        </a>
      </section>
    </>
  );
}