import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ClientsRepository } from '../repositories/clients.repository';
import { CreateClientDto } from '../dtos/create-client.dto';
import { ConflictException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let mockRepo: jest.Mocked<ClientsRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findByUserId: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockImplementation((dto, userId) => ({
        id: 1,
        ...dto,
        userId,
        birthDate: new Date(dto.birthDate),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: ClientsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    mockRepo = module.get(ClientsRepository) as jest.Mocked<ClientsRepository>;
  });

  it('deve criar um novo cliente', async () => {
    const dto: CreateClientDto = {
      name: 'Fernando',
      email: 'fernando@email.com',
      cpf: '123.456.789-00',
      birthDate: '1995-10-15',
      phone: '(21) 98765-4321',
      zipCode: '21000-000',
      country: 'Brasil',
      state: 'Rio de Janeiro',
      city: 'Rio de Janeiro',
      address: 'Rua Exemplo',
      number: '123',
      complement: 'Ap 101',
    };
    const userId = 1;

    const result = await service.create(dto, userId);

    expect(mockRepo.findByUserId).toHaveBeenCalledWith(userId);
    expect(mockRepo.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toMatchObject({
      id: 1,
      ...dto,
      userId,
      birthDate: new Date(dto.birthDate),
    });
  });

  it('deve lançar erro se cliente já existe', async () => {
    const dto: CreateClientDto = {
      name: 'Fernando',
      email: 'fernando@email.com',
      cpf: '123.456.789-00',
      birthDate: '1995-10-15',
      phone: '(21) 98765-4321',
      zipCode: '21000-000',
      country: 'Brasil',
      state: 'Rio de Janeiro',
      city: 'Rio de Janeiro',
      address: 'Rua Exemplo',
      number: '123',
      complement: 'Ap 101',
    };
    const userId = 1;

    mockRepo.findByUserId.mockResolvedValueOnce([
      {
        id: 1,
        userId: 1,
        name: 'Cliente Existente',
        email: 'existente@email.com',
        cpf: '000.000.000-00',
        birthDate: new Date(),
        phone: '(00) 0000-0000',
        zipCode: '00000-000',
        country: 'Brasil',
        state: 'Estado',
        city: 'Cidade',
        address: 'Endereço',
        number: '0',
        complement: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);

    await expect(service.create(dto, userId)).rejects.toThrow(ConflictException);
  });
});
