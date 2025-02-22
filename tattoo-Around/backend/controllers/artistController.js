exports.getArtists = async (req, res, next) => {
    try {
      let query = {};
  
      // Filtros
      if (req.query.estado) query['location.estado'] = req.query.estado;
      if (req.query.cidade) query['location.cidade'] = req.query.cidade;
      if (req.query.specialties) query.specialties = { $in: req.query.specialties.split(',') };
  
      const artists = await Artist.find(query)
        .populate('user', 'name email')
        .populate({
          path: 'reviews',
          select: 'rating comment'
        });
  
      res.status(200).json({
        success: true,
        count: artists.length,
        data: artists
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.getArtistProfile = async (req, res, next) => {
    try {
      const artist = await Artist.findOne({ user: req.user.id });
      
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
      const artist = await Artist.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        data: artist
      });
    } catch (err) {
      next(err);
    }
  };