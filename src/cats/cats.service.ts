import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PrismaClient } from '@prisma/client';
export interface Cat {
  id: number;
  name: string;
  breed: string;
}

export interface response {
  data: any, 
  message: string,
  statusCode: number
  status: string

}

const prisma = new PrismaClient()

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  async create(createCatDto: CreateCatDto): Promise<response> {
    const newCat = await prisma.cat.create({
      data: createCatDto,
    })
    this.cats.push(newCat);
    return {"data": newCat, message: "cats fetched successfully", statusCode: 200, status: "success"};;
  }

  async findAll(): Promise<response> {
    const cats = await prisma.cat.findMany()
    const ret =  {"data": cats, message: "cats fetched successfully", statusCode: 200, status: "success"};
    return ret
  }

  async findOne(id: number): Promise<response> {
    const cat = await prisma.cat.findUnique({
      where: { id: id} });
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return {"data": cat, message: "cats fetched successfully", statusCode: 200, status: "success"};;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<response> {
    try {
      const cat = await prisma.cat.findUnique({where: {id: id}});
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    const updatedCat = await prisma.cat.update({
      where: {
        id: id,
      },
      data: {
        name: updateCatDto.name,
        breed: updateCatDto.breed
      },
    })

    return {"data": updatedCat, message: "Cat updated successfully", statusCode: 500, status: "failure"}; 
    } catch (e){ 
      return {"data": null, message: e.message, statusCode: 500, status: "failure"}; 

    }
    
  }

  async remove(id: number): Promise<response> {
    try{
      const deletedCat =  await prisma.cat.delete({where: {id: id}});
      return  {"data": null, message: "cat deleted successfully", statusCode: 200, status: "success"};   
    } catch (e){
      return {"data": null, message: e.message, statusCode: 500, status: "failure"}; 

    }
  }
}
