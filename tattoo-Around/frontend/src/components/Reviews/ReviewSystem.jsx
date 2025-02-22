import React, { useState, useEffect } from 'react';
import { StarFill, Star } from 'react-bootstrap-icons';
import api from '../services/api';
import { toast } from 'react-toastify';

const ReviewSystem = ({ artistId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userReview, setUserReview] = useState(null);

  // Verificar se usuário já avaliou
  useEffect(() => {
    const checkExistingReview = async () => {
      try {
        const response = await api.get(`/reviews?artistId=${artistId}`);
        if (response.data) {
          setUserReview(response.data);
          setRating(response.data.rating);
          setComment(response.data.comment);
        }
      } catch (error) {
        console.error('Erro ao buscar avaliação:', error);
      }
    };
    checkExistingReview();
  }, [artistId]);

  const handleSubmit = async () => {
    try {
      const payload = { artistId, rating, comment };
      
      if (userReview) {
        await api.put(`/reviews/${userReview._id}`, payload);
        toast.success('Avaliação atualizada!');
      } else {
        await api.post('/reviews', payload);
        toast.success('Avaliação enviada!');
      }
      
      // Atualizar lista de reviews
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao enviar avaliação');
    }
  };

  return (
    <div className="review-system">
      <h3>{userReview ? 'Editar Avaliação' : 'Deixe sua Avaliação'}</h3>
      
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              key={index}
              onClick={() => setRating(ratingValue)}
              className={`star-button ${ratingValue <= rating ? 'active' : ''}`}
              aria-label={`Avaliar com ${ratingValue} estrelas`}
            >
              {ratingValue <= rating ? (
                <StarFill size={25} />
              ) : (
                <Star size={25} />
              )}
            </button>
          );
        })}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Conte sua experiência..."
        maxLength={500}
      />
      <small>{comment.length}/500 caracteres</small>

      <button 
        onClick={handleSubmit}
        disabled={!rating || comment.length < 10}
        className="submit-button"
      >
        {userReview ? 'Atualizar' : 'Enviar'}
      </button>
    </div>
  );
};