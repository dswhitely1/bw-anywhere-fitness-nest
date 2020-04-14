import fs = require('fs');
import { configService } from '../config/config.service';

const file = 'ormconfig.json';

try {
  fs.unlinkSync(file);
} catch (error) {
  console.log(`${file} not found!`);
}

fs.writeFileSync(file, JSON.stringify(configService.getTypeOrmConfig()));
