import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';
import { toast } from 'react-toastify';

// Validação mais completa
const validationSchema = Yup.object({
  name: Yup.string().required('Nome obrigatório'),
  specialty: Yup.string().required('Selecione uma especialidade'),
  bio: Yup.string()
    .max(500, 'Máximo 500 caracteres')
    .required('Biografia obrigatória'),
  styles: Yup.array()
    .min(1, 'Selecione pelo menos um estilo')
    .required('Estilos obrigatórios'),
  hourlyRate: Yup.number()
    .min(50, 'Valor mínimo R$50,00')
    .required('Valor por hora obrigatório'),
});

const ArtistRegistrationForm = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      specialty: '',
      bio: '',
      styles: [],
      hourlyRate: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        
        // Converter objetos para formato adequado
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'styles') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });

        // Adicionar arquivos com nome único
        portfolio.forEach((file, index) => {
          formData.append(`portfolio_${index}`, file);
        });

        await api.post('/artists/register', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        toast.success('Cadastro realizado com sucesso!');
        formik.resetForm();
        setPortfolio([]);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erro no cadastro');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="artist-form">
      {/* Campo Nome */}
      <div className="form-group">
        <label>Nome Completo</label>
        <input
          name="name"
          {...formik.getFieldProps('name')}
          className={formik.errors.name ? 'error' : ''}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error-message">{formik.errors.name}</div>
        )}
      </div>

      {/* Campo Especialidade */}
      <div className="form-group">
        <label>Especialidade Principal</label>
        <select
          name="specialty"
          {...formik.getFieldProps('specialty')}
        >
          <option value="">Selecione...</option>
          <option value="traditional">Traditional</option>
          <option value="realism">Realismo</option>
          {/* Adicione mais opções */}
        </select>
      </div>

      {/* Campo Portfólio */}
      <div className="form-group">
        <label>Portfólio (Máx. 5 arquivos)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files).slice(0, 5);
            setPortfolio(files);
          }}
        />
        <div className="file-preview">
          {portfolio.map((file, index) => (
            <img 
              key={index} 
              src={URL.createObjectURL(file)} 
              alt={`Preview ${index}`} 
            />
          ))}
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Enviando...' : 'Cadastrar'}
      </button>
    </form>
  );
};