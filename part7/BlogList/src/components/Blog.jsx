const Blog = ({ blog }) => {
  return (
    <div>
      <a href={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </a>
    </div>
  );
};

export default Blog;
