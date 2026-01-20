import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../src/axios-client.js";

export default function ShowArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const getArticle = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/v1/articles/${id}`);
        console.log("Full response:", response);
        setArticle(response.data[0]);
        setLoading(false);
      } catch (err) {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
        setLoading(false);
      }
    };
    getArticle();
  }, [id]);

  return (
    <div className="card animated fadeInDown" style={{ padding: "1rem" }}>
      {loading && <p className="text-center">Loading...</p>}

      {!loading && article && (
        <div>
          <div className="text-center">
            <h2>{article.attribute.title}</h2>
          </div>
          &nbsp;
          <div>
            <p><strong>Slug:</strong></p>
            <p>{article.attribute.slug}</p>
          </div>
          &nbsp;
          <div className="article-body">
            <h3>Content</h3>
            <p>{article.attribute.body}</p>
          </div>
          &nbsp;
          <div>
            <p><strong>Created at:</strong></p>
            <p>{article.attribute.created_at}</p>
          </div>
          &nbsp;
          <div>
            <p><strong>Author:</strong> {article.relationships.author.name}</p>
          </div>
        </div>
      )}

      {!loading && !article && (
        <p className="text-center">Article not found</p>
      )}

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
