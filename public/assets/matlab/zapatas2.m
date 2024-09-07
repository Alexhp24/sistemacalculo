function fuerzas_cortantes(column, PD, PL, SISMO)
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    for i=1:1:2 %%Colocamos el numero de iteraciones o el numero de zapatas a diseñar
        %%%%Codigo para dibujar los puntos y su nomenclatura
        figure(1);
            for POx=1:1:length(colum)
            axis([-5 20 -5 20])                 %%amplitud del plano cartesiano
            plot (colum(POx,2),colum(POx,3),"Marker","*")
            text(colum(POx,2),colum(POx,3),['  ' num2str(colum(POx,1))])
            hold on
            end

        %%%%%codigo para obtener los puntos de un poligono cerrado
            [xi,yi] = getline;              %%captura los puntos del dibujo
            PUNTOS1 = [xi yi];              %%coordenadas del poligno abierto
            PUNTOS2 = [xi yi;               %%coordenadas del poligono cerrado
                    PUNTOS1(1,1) PUNTOS1(1,2)]
            plot(PUNTOS2(:,1),PUNTOS2(:,2)) %plotear el poligono

        %%%%% Codigo para capturar a los puntos dentro el poligono dibujado
            in=inpolygon(colum(:,2),colum(:,3),PUNTOS2(:,1),PUNTOS2(:,2)); %captura de puntos
            numel(colum(in)) %numero de puntos dentro del poligono
            UNIR=colum(in)'  %vector de puntos (nomenclatura) dentro del poligono

        %%%%codigo para sacar las propiedades geometricas del poligono
            %%codigo para sacar el centro de gravedad y area del poligono
            jj = length(PUNTOS2); %cantidad de coordenadas del poligono
            P0  =0;
            A0  =0;
            XC  =0;
            YC  =0;
        for i =1:1:jj-1;  %formula para calcular las propiedades
            x1=PUNTOS2(i,1);
            x2=PUNTOS2(i+1,1);
            y1=PUNTOS2(i,2);
            y2=PUNTOS2(i+1,2);

            XC  =(x1*y2-x2*y1)*(x2+x1)+XC;    %centro de gravedad x
            YC  =(x1*y2-x2*y1)*(y2+y1)+YC;    %centro de gravedad y
            A0  =(x1*y2-x2*y1)+A0;            %area
            end
            A  =abs(A0/2);      %AREA
            XC =abs(XC/(6*A));  %CG EN X
            YC =abs(YC/(6*A));  %CG EN Y
                prop = ["A";"XC";"YC"];
                valor = [A;XC;YC];
                patients = table(prop,valor) %plot tabla

            figure(2) %figura para colocar el tamaño de zapatas
                axis([-5 20 -5 20])                 %%amplitud del plano cartesiano
                        for POx=1:1:length(colum)
                        axis([-5 20 -5 20])                 %%amplitud del plano cartesiano
                        plot(colum(POx,2),colum(POx,3),"Marker","*")
                        text(colum(POx,2),colum(POx,3),['  ' num2str(colum(POx,1))])
                        hold on
                        end
                plot (PUNTOS2(:,1),PUNTOS2(:,2)) %ploteo de coordenadas del poligono
                text(XC,YC,['  ' num2str(A), 'm2']) %texto del area en el centro del poligono
                hold on

            %%codigo para mover el centro del plano al centro de gravedad
            hj =ones(length(PUNTOS2),1); %vector de unos de la cantidad de coordenadas
            p2=[hj*XC hj*YC];            %matriz repetida de centros de gravedad para mover el plano cartesiano
            PUNTOS3=PUNTOS2-p2;          %COORDENADAS DEL POLIGONO MOVIDO AL CG

        %%CODIGO PARA SACAR TODAS LAS PROP GEO CON CENTRO EL CG
            P0  =0;
            A0  =0;
            IX0 =0;
            IY0 =0;
            IXY0=0;
            MX0 =0;
            MY0 =0;
            XC1 =0;
            YC1 =0;
            for i =1:1:jj-1;
                x1=PUNTOS3(i,1);
                x2=PUNTOS3(i+1,1);
                y1=PUNTOS3(i,2);
                y2=PUNTOS3(i+1,2);

                XC1  =(x1*y2-x2*y1)*(x2+x1)+XC1;
                YC1  =(x1*y2-x2*y1)*(y2+y1)+YC1;
                A0  =(x1*y2-x2*y1)+A0;
                P0  =((x1-x2)^2+(y1-y2)^2)^0.5+P0;
                MX0 =(x1-x2)*(y2^2+y2*y1+y1^2)+MX0;
                MY0 =(y1-y2)*(x2^2+x2*x1+x1^2)+MY0;
                IY0 =(x1*y2-x2*y1)*(x2^2+x2*x1+x1^2)+IY0;
                IX0 =(x1*y2-x2*y1)*(y2^2+y2*y1+y1^2)+IX0;
                IXY0=(x1*y2-x2*y1)*(2*x2*y2+x2*y1+x1*y2+2*x1*y1)+IXY0;
            end
            PER  =abs(P0); %PERIMETRO
            A  =abs(A0/2); %AREA
            IX =abs(IX0/12); %INERCIA EN X
            IY =abs(IY0/12); %INERCIA EN Y
            XC1 =abs(XC1/(6*A)); %CG EN X
            YC1 =abs(YC1/(6*A)); %CG EN Y
            MX =abs(MX0/6);
            MY =abs(MY0/6);
            IXY=abs(IXY0/24);
                prop = ["A";"PER";"XC";"YC";"IX";"IY";"IX"];
                valor = [A;PER;XC1;YC1;IX;IY;IXY];
                patients = table(prop,valor)
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


        %BUSCADOR DE FUERZAS
        FBA=0
            for i=UNIR              %ESCRIBIR LOS PUNTPS A SUMAR
            FFA=i                   %PUNTO A BUSCAR
            K1=find(PD==FFA)        %BUSCA EL PUNTO EN LA MATRIZ
            K2=find(PL==FFA)        %BUSCA EL PUNTO EN LA MATRIZ
            K3=find(SISMO==FFA)     %BUSCA EL PUNTO EN LA MATRIZ
            PD1=PD(K1,:)            %SALECCIONA LA FILA BUSCADA
            PL1=PL(K1,:)            %SALECCIONA LA FILA BUSCADA
            SISMO1=SISMO(K2,:)      %SALECCIONA LA FILA BUSCADA
            FBA=[PD1;PL1;SISMO1]+FBA%MATRIZ ARMADA CON FILAS BUSCADAS SUMADA A LOS DEMAS PUNTOS
            end

        %CARGAS sismicas
        PS  = FBA(3,2);
        MXS = FBA(3,3);
        MYS = FBA(3,4);
        %cargas muertas
        Pm  =  FBA(1,2);
        MXm =  FBA(1,3);
        MYm =  FBA(1,4);
        %cargas vivas
        Pv  =  FBA(2,2);
        MXv =  FBA(2,3);
        MYv =  FBA(2,4);
        %Combinacion de cargas
        Co = [Pm+Pv   , MXm+MXv    , MYm+MYv;
            Pm+.7*PS   , MXm+0.7*MXS, MYm;
            Pm+.7*PS   , MXm-0.7*MXS, MYm;
            Pm+.7*PS   , MXm        , MYm+0.7*MYS;
            Pm+.7*PS   , MXm        , MYm-0.7*MYS;
            Pm+0.75*Pv+.7*.75*PS  , MXm+0.75*MXv+0.7*0.75*MXS, MYm+0.75*MYv;
            Pm+0.75*Pv+.7*.75*PS  , MXm+0.75*MXv-0.7*0.75*MXS, MYm+0.75*MYv;
            Pm+0.75*Pv+.7*.75*PS  , MXm+0.75*MXv        , MYm+0.75*MYv+0.7*0.75*MYS;
            Pm+0.75*Pv+.7*.75*PS  , MXm+0.75*MXv        , MYm+0.75*MYv-0.7*0.75*MYS;
            .6*Pm+.7*PS   ,.6* MXm        , .6*MYm+0.7*MYS;
            .6*Pm+.7*PS   ,.6* MXm        , .6*MYm-0.7*MYS]
        %PROPIEDADES
        A   = A
        Ixx = IX
        Iyy = IY
        Df  = 2
        %VERTICES DEL POLIGONO
        xv = PUNTOS3(:,1);%%%puntos del poligono
        yv = PUNTOS3(:,2);%puntos del poligono

        %IDENTIFICAR LOS PUNTOS QUE CAEN DENTRO DEL POLIGONO PARA ESO se coloca el
        %minimo valor de un vertice y el maximo valor de un vertice y se genera un
        %rango cuadrado
        x = [-10:.05:10]';%tiene que ser del mismo rango
        y = x;
        [X,Y] = meshgrid(x,y);%CREAR INTERPOLACIONES
        xq = X' ;
        yq = Y';
        in = inpolygon(xq,yq,xv,yv);
        XL= xq(in);
        YL= yq(in);
        ZL= zeros(length(XL),5) ;
        %%%%%calculo de esfuerzos
        figure(3)
                for i =1:6
                    P = Co(i,1)+1.8*A*Df;
                    M2= Co(i,2);
                    M3= Co(i,3);
                    k = P/A + M2*XL./Iyy + M3*YL./Ixx;
                %equacion de flexion
                    ZL(:,i)  = k;
                    vmin =min(k);
                    vmax =max(k);
                    pin  = i;
                %PLOT
                subplot(2,3,i)
                axis([-5 20 -5 20])                 %%amplitud del plano cartesiano
                        for POx=1:1:length(colum)
                        axis([-5 20 -5 20])                 %%amplitud del plano cartesiano
                        plot (colum(POx,2),colum(POx,3),"Marker","*")
                        text(colum(POx,2),colum(POx,3),['  ' num2str(colum(POx,1))])
                        hold on
                        end
                plot(xv+XC,yv+YC,'k-','LineWidth',1) % polygon
                hold on
                scatter3(XL+XC,YL+YC,ZL(:,i),[],ZL(:,i),'.')
                c = colorbar;
                c.Label.String = 'Presion Admisible (Tn/m)';
                view(0,90)
                title({['PURI ' num2str(pin)];['\sigma_m_i_n = ' num2str(vmin),'Tn/m'];['\sigma_m_a_x = ' num2str(vmax),'Tn/m']})
                end
    end
    hold off
endfunction