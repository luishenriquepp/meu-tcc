import { LogicaTemporal } from './logica-temporal';

describe('fluxo', () => {
    it('deve rodar 12 meses e não capitalizar', () => {
        let meses = 12;
        let capitalizacoes: number = 0;
        
        for(let i=1;i<=meses;i++) {
            let verdade = LogicaTemporal.IniciouAnoNovo(i);
            if(verdade) {
                capitalizacoes++;
            }
        }

        expect(capitalizacoes).toBe(0);
    });
    
    it('deve rodar 1 e 1 mes ano e retornar somente 1 capitalizacao', () => {
        let meses = 13;
        let capitalizacoes: number = 0;
        
        for(let i=1;i<=meses;i++) {
            let verdade = LogicaTemporal.IniciouAnoNovo(i);
            if(verdade) {
                capitalizacoes++;
            }
        }

        expect(capitalizacoes).toBe(1);
    });

    it('Deve rodar 10 anos e retornar 9 capitalizacoes', () => {        
        let meses = 120;
        let capitalizacoes: number = 0;
        let logica = new LogicaTemporal();
        
        for(let i=1;i<=meses;i++) {
            let verdade = LogicaTemporal.IniciouAnoNovo(i);
            if(verdade) {
                capitalizacoes++;
            }
        }

        expect(capitalizacoes).toBe(9);
    });

    it('Deve rodar 10 anos e 1 dia e retornar 10 capitalizacoes', () => {        
        let meses = 121;
        let capitalizacoes: number = 0;
        let logica = new LogicaTemporal();
        
        for(let i=1;i<=meses;i++) {
            let verdade = LogicaTemporal.IniciouAnoNovo(i);
            if(verdade) {
                capitalizacoes++;
            }
        }

        expect(capitalizacoes).toBe(10);
    });
});