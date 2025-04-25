import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

export function DocClientCreate() {
  return applyDecorators(
    ApiTags('Clients'),
    ApiOperation({ summary: 'Criar um novo cliente' }),
    ApiResponse({ status: 201, description: 'Cliente criado com sucesso' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
    ApiResponse({ status: 409, description: 'CPF ou e-mail já cadastrado' }),
  );
}

export function DocClientGetClient() {
  return applyDecorators(
    ApiTags('Clients'),
    ApiOperation({ summary: 'Obter o cliente logado' }),
    ApiResponse({ status: 200, description: 'Cliente encontrado com sucesso' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado' }),
  );
}

export function DocClientFindById() {
  return applyDecorators(
    ApiTags('Clients'),
    ApiOperation({ summary: 'Buscar um cliente por ID' }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiResponse({ status: 200, description: 'Cliente encontrado com sucesso' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado' }),
  );
}

export function DocClientList() {
  return applyDecorators(
    ApiTags('Clients'),
    ApiOperation({ summary: 'Listar clientes' }),
    ApiResponse({ status: 200, description: 'Lista de clientes' }),
    ApiResponse({ status: 400, description: 'Parâmetros inválidos' }),
  );
}

export function DocClientUpdate() {
  return applyDecorators(
    ApiTags('Clients'),
    ApiOperation({ summary: 'Atualizar dados de um cliente' }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
  );
}

export function DocClientDelete() {
  return applyDecorators(
    ApiTags('Clients'),
    ApiOperation({ summary: 'Excluir (soft delete) um cliente' }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiResponse({ status: 200, description: 'Cliente excluído com sucesso' }),
    ApiResponse({ status: 404, description: 'Cliente não encontrado' }),
  );
}
