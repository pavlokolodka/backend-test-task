import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from './entity/roles.entity';
import { UserRoles } from './entity/user-roles.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRoles]), forwardRef(() => AuthModule)],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
