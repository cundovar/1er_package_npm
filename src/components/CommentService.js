import React, { useState, useEffect } from 'react';


const CommentService = ({ apiUrl,axio }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
   
  // Récupérer les commentaires depuis l'API
  const fetchComments = async () => {
    try {
      const response = await axio.get(`${apiUrl}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
    }
  };

  // Charger les commentaires au montage du composant
  useEffect(() => {
    fetchComments();
  }, []);

  // Ajouter un commentaire
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      await axio.post(`${apiUrl}/comments`, { content: newComment });
      setNewComment('');
      fetchComments();  // Recharger les commentaires après ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    }
  };
console.log("axio",axio)
  return (
    <div>
      {/* Formulaire pour ajouter un commentaire */}
      <form onSubmit={handleAddComment} className='mb-3'>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajoutez un commentaire"
          rows="4"
          cols="50"
          required
          className='text-white font-bold w-full bg-slate-800 p-1'
        />
        <button type="submit" className='text-white'>Ajouter un commentaire</button>
      </form>

      {/* Liste des commentaires */}
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className='border p-2 rounded-2xl text-black bg-slate-700 mb-3'>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour l'instant</p>
        )}
      </div>
    </div>
  );
};

export default CommentService;
