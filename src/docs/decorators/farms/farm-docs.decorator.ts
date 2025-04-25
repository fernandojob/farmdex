// src/docs/decorators/farm-docs.decorator.ts

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';

export function DocFarmCreate() {
  return applyDecorators(
    ApiTags('Farms'),
    ApiOperation({ summary: 'Criar uma nova fazenda' }),
    ApiResponse({ status: 201, description: 'Fazenda criada com sucesso' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
  );
}

export function DocFarmList() {
  return applyDecorators(
    ApiTags('Farms'),
    ApiOperation({ summary: 'Listar fazendas do usuário autenticado' }),
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'name', required: false, type: String }),
    ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'foundationDate', 'totalArea', 'plotCount'] }),
    ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] }),
    ApiResponse({ status: 200, description: 'Lista de fazendas retornada com sucesso' }),
  );
}

export function DocFarmFindById() {
  return applyDecorators(
    ApiTags('Farms'),
    ApiOperation({ summary: 'Buscar uma fazenda por ID' }),
    ApiParam({ name: 'id', type: Number }),
    ApiResponse({ status: 200, description: 'Fazenda encontrada com sucesso' }),
    ApiResponse({ status: 404, description: 'Fazenda não encontrada' }),
  );
}

export function DocFarmUpdate() {
  return applyDecorators(
    ApiTags('Farms'),
    ApiOperation({ summary: 'Atualizar uma fazenda por ID' }),
    ApiParam({ name: 'id', type: Number }),
    ApiResponse({ status: 200, description: 'Fazenda atualizada com sucesso' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
    ApiResponse({ status: 404, description: 'Fazenda não encontrada' }),
  );
}

export function DocFarmDelete() {
  return applyDecorators(
    ApiTags('Farms'),
    ApiOperation({ summary: 'Excluir (soft delete) uma fazenda' }),
    ApiParam({ name: 'id', type: Number }),
    ApiResponse({ status: 200, description: 'Fazenda excluída com sucesso' }),
    ApiResponse({ status: 404, description: 'Fazenda não encontrada' }),
  );
}
