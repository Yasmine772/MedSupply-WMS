import { useEffect, useState } from "react";
import axiosClient from "../../src/axios-client.js";
import { Link } from "react-router-dom";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    setLoading(true);
    axiosClient
      .get("/v1/articles")
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        setLoading(false);
        console.error("Error fetching articles:", err);
      });
  };

  const onDelete = (article) => {
    axiosClient
      .delete(`/v1/articles/${article.id}`)
      .then(() => {
        getArticles();
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        console.error("Error deleting article:", err);
      });
  };

  const filteredArticles = articles.filter((article) =>
    article.attribute.title.toLowerCase().includes(search.toLowerCase())
  )
.sort((a, b) => new Date(b.attribute.created_at) - new Date(a.attribute.created_at));

  return (
    <div>
      <div>
        <h1>Articles</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "0.5rem", flexGrow: 1 }}
          />
          <Link to="/articleList/create" className="btn-add" style={{ whiteSpace: "nowrap" }}>
            Add Article
          </Link>
        </div>


      </div>

      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading && (
            <tbody>
            <tr>
              <td colSpan="4" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
            {filteredArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.attribute.title}</td>
                <td>{article.attribute.slug}</td>
                <td>{article.attribute.created_at}</td>
                <td>
                  <Link
                    className="btn-view"
                    to={`/showArticle/${article.id}`}
                  >
                    Show
                  </Link>
                  &nbsp;
                  <Link className="btn-edit" to={`/articleList/${article.id}`}>
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => onDelete(article)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          )}
        </table>
      </div>

      {errors && (
        <div className="text-center text-red-500">
          {Object.values(errors).map((errMsg, idx) => (
            <p key={idx}>{errMsg}</p>
          ))}
        </div>
      )}
    </div>
  );
}
