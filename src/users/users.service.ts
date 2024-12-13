import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';




@Injectable()
export class UsersService {

  users:CreateUserDto[]=[]

  create(newCadastro: CreateUserDto):CreateUserDto{
  
     const nextId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
     
    newCadastro.id = nextId;
    this.users.push(newCadastro);
    return newCadastro;
    
    

  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const index = this.users.findIndex(u => u.id == id);
    if (index === -1) throw new NotFoundException();
       return this.users.find(u=>u.id==id);
  }

  update(id: number, updateUserDto: UpdateUserDto):UpdateUserDto {
    const index = this.users.findIndex(u => u.id == id);
    if (index === -1) throw new NotFoundException();
   
    const user = this.users[index];
   
    if (updateUserDto.name) user.name = updateUserDto.name;
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.cep) user.cep = updateUserDto.cep;
    this.users[index] = user;
   
    return user;
   
   
  
  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id == id);
  if (index === -1) throw new NotFoundException();
 
  this.users.splice(index, 1);
  return {message:"Deletado com sucesso"};
  }
}
export { CreateUserDto };

