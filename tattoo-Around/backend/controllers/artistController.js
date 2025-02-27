const Artist = require('../models/Artist');

// Helper para filtrar query params
const filterQueryParams = (query, ...allowedFields) => {
  const filteredQuery = {};
  Object.keys(query).forEach(el => {
    if (allowedFields.includes(el)) filteredQuery[el] = query[el];
  });
  return filteredQuery;
};

exports.getArtists = async (req, res, next) => {
  try {
    // 1. Filtragem dos parâmetros da query
    const filterParams = filterQueryParams(
      req.query,
      'estado',
      'cidade',
      'specialties',
      'minRating'
    );
    
    const query = {};
    
    // Filtro por localização
    if (filterParams.estado) query['location.estado'] = filterParams.estado;
    if (filterParams.cidade) query['location.cidade'] = filterParams.cidade;
    
    // Filtro por especialidades (convertendo a string em array)
    if (filterParams.specialties) {
      query.specialties = { $in: filterParams.specialties.split(',') };
    }
    
    // Filtro por classificação mínima
    if (filterParams.minRating) {
      query.rating = { $gte: Number(filterParams.minRating) };
    }

    // 2. Paginação
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // 3. Execução da query com populações de dados relacionados
    const artists = await Artist.find(query)
      .populate({
        path: 'user',
        select: 'name email avatar'
      })
      .populate({
        path: 'reviews',
        select: 'rating comment',
        populate: {
          path: 'user',
          select: 'name'
        }
      })
      .skip(skip)
      .limit(limit);

    // 4. Contagem total para paginação
    const total = await Artist.countDocuments(query);

    res.status(200).json({
      success: true,
      count: artists.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: artists
    });

  } catch (err) {
    next(err);
  }
};

exports.getArtistProfile = async (req, res, next) => {
  try {
    const artist = await Artist.findOne({ user: req.user.id })
      .populate({
        path: 'user',
        select: 'name email phone'
      })
      .populate({
        path: 'reviews',
        select: 'rating comment createdAt',
        populate: {
          path: 'user',
          select: 'name avatar'
        }
      });

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Perfil de artista não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: artist
    });
  } catch (err) {
    next(err);
  }
};

exports.updateArtistProfile = async (req, res, next) => {
  try {
    // 1. Filtrar os campos permitidos para atualização
    const filteredBody = filterQueryParams(
      req.body,
      'specialties',
      'hourlyRate',
      'availability',
      'portfolio'
    );

    // 2. Atualizar o perfil do artista com validação
    const artist = await Artist.findOneAndUpdate(
      { user: req.user.id },
      filteredBody,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
    .populate({
      path: 'user',
      select: 'name email'
    });

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artista não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: artist
    });
  } catch (err) {
    next(err);
  }
};

//Cria o perfil de artista para o usuário autenticado.

exports.createArtist = async (req, res, next) => {
 try {
   // Opcional: verifique se o artista já existe para o usuário
   let existingArtist = await Artist.findOne({ user: req.user.id });
   if (existingArtist) {
     return res.status(400).json({
       success: false,
       message: 'Perfil de artista já existe para este usuário'
     });
   }

   // Cria o artista utilizando os dados do req.body e vinculando o usuário autenticado
   const artist = await Artist.create({
     user: req.user.id,
     ...req.body
   });

   res.status(201).json({
     success: true,
     data: artist
   });
 } catch (err) {
   next(err);
 }
};

