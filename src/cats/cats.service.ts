import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Prisma, PrismaClient } from '@prisma/client';
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

  // update(id: number, updateCatDto: UpdateCatDto): Cat {
  //   const catIndex = this.cats.findIndex(cat => cat.id === id);
  //   if (catIndex === -1) {
  //     throw new NotFoundException(`Cat with ID ${id} not found`);
  //   }

  //   const updatedCat = { ...this.cats[catIndex], ...updateCatDto };
  //   this.cats[catIndex] = updatedCat;
  //   return updatedCat;
  // }

  // remove(id: number): void {
  //   const catIndex = this.cats.findIndex(cat => cat.id === id);
  //   if (catIndex === -1) {
  //     throw new NotFoundException(`Cat with ID ${id} not found`);
  //   }
  //   this.cats.splice(catIndex, 1);
  // }
}
