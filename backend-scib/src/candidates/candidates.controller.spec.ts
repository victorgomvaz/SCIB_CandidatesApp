import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

describe('CandidatesController', () => {
  let controller: CandidatesController;
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [CandidatesService],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.combineData with correct parameters', () => {
    const excelData = {
      seniority: 'junior',
      yearsOfExperience: 2,
      availability: true,
    };

    jest.spyOn(service, 'parseExcel').mockReturnValue(excelData);
    
    const mockService = jest.spyOn(service, 'combineData').mockReturnValue({
      name: 'Test',
      surname: 'User',
      ...excelData,
    });

    const result = controller.uploadCandidate(
      { buffer: Buffer.from('') } as any,
      'Test',
      'User',
    );
    expect(mockService).toHaveBeenCalledWith('Test', 'User', expect.anything());
    expect(result).toEqual({
      name: 'Test',
      surname: 'User',
      ...excelData,
    });
  });

  it('should return merged candidate', () => {
    const mockExcelData = {
      seniority: 'senior',
      yearsOfExperience: 4,
      availability: false,
    };

    jest.spyOn(service, 'parseExcel').mockReturnValue(mockExcelData);
    jest
      .spyOn(service, 'combineData')
      .mockImplementation((n, s, e) => ({ name: n, surname: s, ...e }));

    const result = controller.uploadCandidate(
      { buffer: Buffer.from('') } as any,
      'Ana',
      'Lopez',
    );
    expect(result).toEqual({
      name: 'Ana',
      surname: 'Lopez',
      ...mockExcelData,
    });
  });

  it('should handle missing excel data gracefully', () => {
    jest.spyOn(service, 'parseExcel').mockReturnValue(undefined);
    jest
      .spyOn(service, 'combineData')
      .mockImplementation((n, s, e) => ({ name: n, surname: s, ...e }));

    const result = controller.uploadCandidate(
      { buffer: Buffer.from('') } as any,
      'Ana',
      'Lopez',
    );
    expect(result).toEqual({
      name: 'Ana',
      surname: 'Lopez',
      seniority: undefined,
      yearsOfExperience: undefined,
      availability: undefined,
    });
  });

  it('should call parseExcel with uploaded file', () => {
    const buffer = Buffer.from('dummy');
    const file = { buffer } as Express.Multer.File;
    const spy = jest.spyOn(service, 'parseExcel').mockReturnValue({});

    controller.uploadCandidate(file, 'A', 'B');
    expect(spy).toHaveBeenCalledWith(file);
  });
});
