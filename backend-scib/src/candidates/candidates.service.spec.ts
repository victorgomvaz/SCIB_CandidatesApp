import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesService } from './candidates.service';

describe('CandidatesService', () => {
  let service: CandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidatesService],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  beforeEach(() => {
    service = new CandidatesService();
  });

  it('should combine data correctly', () => {
    const result = service.combineData('John', 'Doe', {
      seniority: 'senior',
      yearsOfExperience: 5,
      availability: true,
    });

    expect(result).toEqual({
      name: 'John',
      surname: 'Doe',
      seniority: 'senior',
      yearsOfExperience: 5,
      availability: true,
    });
  });

  it('should parse Excel buffer with one row', () => {
    const fs = require('fs');
    const buffer = fs.readFileSync(
      __dirname + '/../../test/test-candidate.xlsx',
    );
    const mockFile = { buffer } as Express.Multer.File;

    const parsed = service.parseExcel(mockFile);
    expect(parsed).toHaveProperty('seniority');
    expect(parsed).toHaveProperty('yearsOfExperience');
    expect(parsed).toHaveProperty('availability');
  });

  it('should return undefined values if excel is empty', () => {
    const XLSX = require('xlsx');
    const sheet = XLSX.utils.aoa_to_sheet([]);
    const buffer = XLSX.write(
      { SheetNames: ['Sheet1'], Sheets: { Sheet1: sheet } },
      { type: 'buffer', bookType: 'xlsx' },
    );
    const mockFile = { buffer } as Express.Multer.File;

    const result = service.parseExcel(mockFile);
    expect(result).toBeUndefined();
  });

  it('should handle missing fields in excel', () => {
    const result = service.combineData('Alice', 'Smith', {});
    expect(result).toEqual({
      name: 'Alice',
      surname: 'Smith',
      seniority: undefined,
      yearsOfExperience: undefined,
      availability: undefined,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
