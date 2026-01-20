import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../src/axios-client.js";
import { useNavigate } from "react-router-dom";


export default function ArticleForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    id: null,
    title: "",
    body: "",
  });

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      title: article.title,
      body: article.body,
    };

    if (article.id) {
      axiosClient.put(`/v1/articles/${article.id}`, payload)
        .then(() => {
          navigate("/articleList");
        });
    } else {
      axiosClient.post(`/v1/articles`, payload)
        .then(() => {
          navigate("/articleList");

        });
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/v1/articles/${id}`)
        .then(({ data }) => {
          setLoading(false);
          const fetched = data.data[0];
          setArticle({
            id: fetched.id,
            title: fetched.attribute.title,
            body: fetched.attribute.body,
          });
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div>
      { article.id && <h1>Update Article : {article.title}</h1>}
      {!article.id && <h1>New Article</h1>}

      <div className="card animated fadeInDown">
        {loading && <div className="text-center">loading...</div>}

        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={article.title}
              onChange={(ev) =>
                setArticle({ ...article, title: ev.target.value })
              }
              placeholder="title"
            />
            <input
              value={article.body}
              onChange={(ev) =>
                setArticle({ ...article, body: ev.target.value })
              }
              placeholder="body"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
