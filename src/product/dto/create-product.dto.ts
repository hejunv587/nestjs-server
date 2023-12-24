import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: '产品型号', example: 'FXTUL M3' })
    model: string;

    @ApiProperty({ description: '产品名称', example: 'FXTUL M3 is a handheld motorcycle diagnostic tool' })
    name: string;

    // Other properties...
    @ApiProperty({ description: '产品描述', example: 'FXTUL M3 is a handheld motorcycle diagnostic tool' })
    description: string;

    @ApiProperty({ description: '产品概述', example: 'FXTUL M3 is a handheld motorcycle diagnostic tool' })
    overview: string;

    @ApiProperty({ description: '产品功能', type: [String], example: '["Support engine", "Read system information", "Read fault code"]' })
    functions: string[];

    @ApiProperty({ description: '产品优势', type: [String], example: '["No internet connection or setup required", "Lightweight one-handed operation"]' })
    advantages: string[];

    @ApiProperty({ description: '技术参数', type: [String], example: '["Voltage: DC10-15V", "Display: 2.8 color screen", "Machine size: 16.5*8.5*2.5CM"]' })
    technical_parameters: string[];

    // Other properties...

    //   @ApiProperty({ description: '关于产品', type: [AboutDto], isArray: true })
    //   about: AboutDto[];

    @ApiProperty({ description: '服务', example: '["Free software upgrade", "3 years warranty"]' })
    services: string[];

    @ApiProperty({ description: '为什么选择', example: '["Leading brand of motorcycle tools", "FXTUL official store direct sales"]' })
    whychoose: string[];

    @ApiProperty({ description: '注意事项', example: '["Please follow the instructions after M3 connects the motorcycle."]' })
    note: string[];
    productId: any;

    //   @ApiProperty({ description: '常见问题及回答', type: [QADto], isArray: true })
    //   qa: QADto[];
}

