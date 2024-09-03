function zapatas(A, Ixx, Iyy, Df, PS, MXS, MYS, Pm, MXm, MYm, Pv, MXv, MYv, poligonos)
  function [k] = ecuacionDeFlexion(Co, A, XL, YL, Ixx, Iyy, multiplier, first, last)
    P  = Co(first:last,1)'+1.8*A*multiplier;
    M2 = Co(first:last,2)';
    M3 = Co(first:last,3)';
    k  = P./A + (XL./Iyy)*M2 + (YL./Ixx)*M3;
  end
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
  xvalues = [poligonos.poligonoExterior(1,:);
             poligonos.poligonoInterior1(1,:);
             poligonos.poligonoInterior2(1,:);
             poligonos.poligonoInterior3(1,:);
             poligonos.poligonoInterior4(1,:);
             poligonos.poligonoInterior5(1,:)];
  yvalues = [poligonos.poligonoExterior(2,:);
             poligonos.poligonoInterior1(2,:);
             poligonos.poligonoInterior2(2,:);
             poligonos.poligonoInterior3(2,:);
             poligonos.poligonoInterior4(2,:);
             poligonos.poligonoInterior5(2,:)];
  minx = min(min(xvalues));
  maxx = max(max(xvalues));
  miny = min(min(yvalues));
  maxy = max(max(yvalues));
  x = [minx:.05:maxx]; %tiene que ser del mismo rango
  y = [miny:.05:maxy];

  [X,Y] = meshgrid(x,y); %CREAR INTERPOLACIONES
  xq = X;
  yq = Y;
  in =    inpolygon(xq,yq,poligonos.poligonoExterior(1,:),poligonos.poligonoExterior(2,:))...
       & !inpolygon(xq,yq,poligonos.poligonoInterior1(1,:),poligonos.poligonoInterior1(2,:))...
       & !inpolygon(xq,yq,poligonos.poligonoInterior2(1,:),poligonos.poligonoInterior2(2,:))...
       & !inpolygon(xq,yq,poligonos.poligonoInterior3(1,:),poligonos.poligonoInterior3(2,:))...
       & !inpolygon(xq,yq,poligonos.poligonoInterior4(1,:),poligonos.poligonoInterior4(2,:))...
       & !inpolygon(xq,yq,poligonos.poligonoInterior5(1,:),poligonos.poligonoInterior5(2,:));
  XL= xq(in);
  YL= yq(in);
  ZL  = cat(2, ecuacionDeFlexion(Co, A, XL, YL, Ixx, Iyy, Df, 1, 6), ecuacionDeFlexion(Co, A, XL, YL, Ixx, Iyy, 1.8, 7, 11));
  ZLT = ZL';
  mins = min(ZLT, [], 2);
  maxs = max(ZLT, [], 2);
  save("-mat7-binary", "-", "XL", "YL", "ZLT", "mins", "maxs");
endfunction