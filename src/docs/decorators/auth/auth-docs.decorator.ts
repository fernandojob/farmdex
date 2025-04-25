import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function DocAuthRegister() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ summary: 'Registrar um novo usuário' }),
    ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' }),
    ApiResponse({ status: 400, description: 'Dados inválidos ou usuário já existe' }),
  );
}

export function DocAuthLogin() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ summary: 'Login com e-mail e senha' }),
    ApiResponse({ status: 200, description: 'Login bem-sucedido, retorna access_token' }),
    ApiResponse({ status: 401, description: 'Credenciais inválidas' }),
  );
}
