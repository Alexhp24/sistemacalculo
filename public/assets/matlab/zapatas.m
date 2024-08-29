function zapatas(A, Ixx, Iyy, Df, PS, MXS, MYS, Pm, MXm, MYm, Pv, MXv, MYv, poligonos)
  %%%%%%PROCESO
  Co = [Pm+Pv         , MXm+MXv    , MYm+MYv;
        Pm+.7*PS      , MXm+0.7*MXS, MYm;
        Pm+.7*PS      , MXm-0.7*MXS, MYm;
        Pm+.7*PS      , MXm        , MYm+0.7*MYS;
        Pm+.7*PS      , MXm        , MYm-0.7*MYS;
        Pm+0.75*Pv+.7*.75*PS       , MXm+0.75*MXv+0.7*0.75*MXS, MYm+0.75*MYv;
        Pm+0.75*Pv+.7*.75*PS       , MXm+0.75*MXv-0.7*0.75*MXS, MYm+0.75*MYv;
        Pm+0.75*Pv+.7*.75*PS       , MXm+0.75*MXv             , MYm+0.75*MYv+0.7*0.75*MYS;
        Pm+0.75*Pv+.7*.75*PS       , MXm+0.75*MXv             , MYm+0.75*MYv-0.7*0.75*MYS;
        .6*Pm+.7*PS   ,.6* MXm     , .6*MYm+0.7*MYS;
        .6*Pm+.7*PS   ,.6* MXm     , .6*MYm-0.7*MYS];

  %IDENTIFICAR LOS PUNTOS QUE CAEN DENTRO DEL POLIGONO PARA ESO se coloca el
  %minimo valor de un vertice y el maximo valor de un vertice y se genera un
  %rango cuadrado
  x = [-30:.05:30]; %tiene que ser del mismo rango
  y = x;

  [X,Y] = meshgrid(x,y); %CREAR INTERPOLACIONES
  xq = X;
  yq = Y;
  in = inpolygon(xq,yq,poligonos.poligonoExterior(1,:),poligonos.poligonoExterior(2,:)) & !inpolygon(xq,yq,poligonos.poligonoInterior1(1,:),poligonos.poligonoInterior1(2,:)) & !inpolygon(xq,yq,poligonos.poligonoInterior2(1,:),poligonos.poligonoInterior2(2,:)) & !inpolygon(xq,yq,poligonos.poligonoInterior3(1,:),poligonos.poligonoInterior3(2,:)) & !inpolygon(xq,yq,poligonos.poligonoInterior4(1,:),poligonos.poligonoInterior4(2,:)) & !inpolygon(xq,yq,poligonos.poligonoInterior5(1,:),poligonos.poligonoInterior5(2,:));
  XL= xq(in);
  YL= yq(in);
  ZL= zeros(length(XL),5);

  vmins = [];
  vmaxs = [];
  for i =1:6
    P = Co(i,1)+1.8*A*Df;
    M2= Co(i,2);
    M3= Co(i,3);
    k = P/A + M2*XL./Iyy + M3*YL./Ixx;
    %equacion de flexion
    ZL(:,i) = k;
    vmin    = min(k);
    vmax    = max(k);
    vmins   = [vmins vmin];
    vmaxs   = [vmaxs vmax];
  end

  for i =7:11
    P = Co(i,1)+1.8*A*1.8;
    M2= Co(i,2);
    M3= Co(i,3);
    k = P/A + M2*XL./Iyy + M3*YL./Ixx;
    %equacion de flexion
    ZL(:,i)  = k;
    vmin  = min(k);
    vmax  = max(k);
    vmins = [vmins vmin];
    vmaxs = [vmaxs vmax];
  end
  ZLT = ZL';
  save("-mat7-binary", "-", "XL", "YL", "ZLT", "vmins", "vmaxs");
endfunction
