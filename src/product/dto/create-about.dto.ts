import { ApiProperty } from '@nestjs/swagger';
export class CreateAboutDto {
    @ApiProperty({
        description: '产品相关说明name',
        type: String,
        example: 'SOFTWARE UPGRADES',
    })
    name: string;

    @ApiProperty({
        description: '产品相关说明描述',
        type: String,
        example: 'Connect the device to the computer and wait for the device to be recognized by the computer. After the recognition is successful, a new drive symbol will appear on the computer. Open this and replace the “DIAGNOSE" folder in the drive with the downloaded “DIAGNOSE" upgrade folder, and then power on again. The updated files can be obtained by contacting customer service or the official website.',
    })
    desc: string;

    @ApiProperty({
        description: '产品记录id',
        type: String,
        example: '1',
        nullable: true,
    })
    productId?: number; // This is optional, depending on how you want to handle it
}


