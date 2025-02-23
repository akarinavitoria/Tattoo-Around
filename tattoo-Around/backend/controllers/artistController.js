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
    // 1. Filtragem
    const filterParams = filterQueryParams(
      req.query,
      'estado',
      'cidade',
      'specialties',
      'minRating'
    );
    
    const query = {};
    
    // Localização
    if (filterParams.estado) query['location.estado'] = filterParams.estado;
    if (filterParams.cidade) query['location.cidade'] = filterParams.cidade;
    
    // Especialidades
    if (filterParams.specialties) {
      query.specialties = { $in: filterParams.specialties.split(',') };
    }
    
    // Classificação mínima
    if (filterParams.minRating) {
      query.rating = { $gte: Number(filterParams.minRating) };
    }

    // 2. Paginação
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // 3. Executar query
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
    // 1. Filtrar campos permitidos
    const filteredBody = filterQueryParams(
      req.body,
      'specialties',
      'hourlyRate',
      'availability',
      'portfolio'
    );

    // 2. Atualizar com validação
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