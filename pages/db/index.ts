import mongoose from 'mongoose';
import config from 'config';

mongoose.connect(config.get('mongoUrl'), {
  useNewUrlParser: true,
});
