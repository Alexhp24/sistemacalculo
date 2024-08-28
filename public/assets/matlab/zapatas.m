function zapatas(A, Ixx, Iyy, Df, PS, MXS, MYS, Pm, MXm, MYm, Pv, MXv, MYv, xv, yv)
  xv = [-7.0389	7.0539	7.0539	-7.0389 -7.0389	-5.5291	-5.5597	-3.3975	-3.3975	-5.5589	-5.5491	5.5539	5.5539	2.5561	2.5561	5.5539	5.5539	-5.5291 -7.0389 -7.0389 -5.5291	-5.5291	-3.3975	-3.392	-0.5897	-0.5897	1.5553	1.5571	2.5557	2.5557	5.5539	5.5539	-5.5291 -7.0389];%%%puntos del poligono
  yv = [11.6025	11.6025	-8.4825	-8.4825 11.6025	10.1025	6.0669	6.0669	2.6826	2.6826	-0.2575	-0.2575	2.6826	2.6826	6.0666	6.0666	10.1025	10.1025	11.6025 -8.4825 -1.7575	-4.5928	-4.5928	-6.9824	-6.9824	-6.2075	-6.2075	-6.971	-6.971	-4.5928	-4.5928	-1.7575	-1.7575 -8.4825];%puntos del poligono
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
  x = [-30:.05:30]'; %tiene que ser del mismo rango
  y = x;

  [X,Y] = meshgrid(x,y); %CREAR INTERPOLACIONES
  xq = X';
  yq = Y';
  in = inpolygon(xq,yq,xv,yv);
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
    %scatter3(XL,YL,ZL(:,i),[],ZL(:,i),'.')
    % c.Label.String = 'Presion Admisible (Tn/m)';
    %view(0,90)
    %title({['Comb ' num2str(pin)];['\sigma_m_i_n = ' num2str(vmin),'Tn/m'];['\sigma_m_a_x = ' num2str(vmax),'Tn/m']})
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
    %scatter3(XL,YL,ZL(:,i),[],ZL(:,i),'.')
    %c = colorbar;
    %c.Label.String = 'Presion Admisible (Tn/m)';
    %view(0,90)
    %title({['Comb ' num2str(pin)];['\sigma_m_i_n = ' num2str(vmin),'Tn/m'];['\sigma_m_a_x = ' num2str(vmax),'Tn/m']})
  end
  ZLT = ZL';
  save("-mat7-binary", "-", "XL", "YL", "ZLT", "vmins", "vmaxs");
endfunction
