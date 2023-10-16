import { Module, Global } from '@nestjs/common';

interface Option {
    path: string
}

@Global()
@Module({
    // providers: [
    //     {
    //         provide: 'config',
    //         useValue: { baseUrl: '/api' }
    //     }
    // ],
    // exports: [
    //     {
    //         provide: 'config',
    //         useValue: { baseUrl: '/api' }
    //     }
    // ],
})
export class Config {
    static forRoot(option: Option) {
        return {
            module: Config,
            providers: [
                {
                    provide: 'config',
                    useValue: { baseUrl: '/api' + option.path }
                }
            ],
            exports: [
                {
                    provide: 'config',
                    useValue: { baseUrl: '/api' + option.path }
                }
            ],
        }
    }
}