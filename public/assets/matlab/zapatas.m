function zapatas(id, A, Ixx, Iyy, Df, PS, MXS, MYS, Pm, MXm, MYm, Pv, MXv, MYv, xv, yv)
%%%%%%PROCESO
Co = [Pm+Pv      , MXm+MXv    , MYm+MYv;
      Pm+.7*PS   , MXm+0.7*MXS, MYm;
      Pm+.7*PS   , MXm-0.7*MXS, MYm;
      Pm+.7*PS   , MXm        , MYm+0.7*MYS;
      Pm+.7*PS   , MXm        , MYm-0.7*MYS;
      Pm+0.75*Pv+.7*.75*PS    , MXm+0.75*MXv+0.7*0.75*MXS, MYm+0.75*MYv;
      Pm+0.75*Pv+.7*.75*PS    , MXm+0.75*MXv-0.7*0.75*MXS, MYm+0.75*MYv;
      Pm+0.75*Pv+.7*.75*PS    , MXm+0.75*MXv        , MYm+0.75*MYv+0.7*0.75*MYS;
      Pm+0.75*Pv+.7*.75*PS    , MXm+0.75*MXv        , MYm+0.75*MYv-0.7*0.75*MYS;
      .6*Pm+.7*PS             ,.6* MXm              , .6*MYm+0.7*MYS;
      .6*Pm+.7*PS             ,.6* MXm              , .6*MYm-0.7*MYS]

%IDENTIFICAR LOS PUNTOS QUE CAEN DENTRO DEL POLIGONO PARA ESO se coloca el
%minimo valor de un vertice y el maximo valor de un vertice y se genera un
%rango cuadrado
x = [-30:.05:30]';%tiene que ser del mismo rango
y = x;

[X,Y] = meshgrid(x,y);%CREAR INTERPOLACIONES
xq = X' ;
yq = Y';
in = inpolygon(xq,yq,xv,yv);
XL= xq(in);
YL= yq(in);
ZL= zeros(length(XL),5) ;
figure('Name','ADFUN V4.0','NumberTitle','off', 'Visible', 'off')
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
plot(xv,yv,'k-','LineWidth',1) % polygon
hold on
% plot(xq(in),yq(in),'r+') % points inside
% hold off
% PLOT
% figure
scatter3(XL,YL,ZL(:,i),[],ZL(:,i),'.')
c = colorbar;
% c.Label.String = 'Presion Admisible (Tn/m)';
ylabel(c, 'Presion Admisible (Tn/m)');
view(0,90)
%title(vmin)
title({['Comb ' num2str(pin)];['\sigma_m_i_n = ' num2str(vmin),'Tn/m'];['\sigma_m_a_x = ' num2str(vmax),'Tn/m']})
print("-dpng", ["./assets/img/fcsv/zapatas1" id ".png"])
end

figure('Name','ADFUN V4.0','NumberTitle','off', 'Visible', 'off')
for i =7:11
    P = Co(i,1)+1.8*A*1.8;
    M2= Co(i,2);
    M3= Co(i,3);
    k = P/A + M2*XL./Iyy + M3*YL./Ixx;
%equacion de flexion
    ZL(:,i)  = k;
    vmin =min(k);
    vmax =max(k);
    pin  = i;
%PLOT
subplot(2,3,i-6)
plot(xv,yv,'k-','LineWidth',1) % polygon
hold on
% plot(xq(in),yq(in),'r+') % points inside
% hold off
% PLOT
% figure
scatter3(XL,YL,ZL(:,i),[],ZL(:,i),'.')
c = colorbar;
% c.Label.String = 'Presion Admisible (Tn/m)';
ylabel(c, 'Presion Admisible (Tn/m)');
view(0,90)
%title(vmin)
title({['Comb ' num2str(pin)];['\sigma_m_i_n = ' num2str(vmin),'Tn/m'];['\sigma_m_a_x = ' num2str(vmax),'Tn/m']})
end
print("-dpng", ["./assets/img/fcsv/zapatas2" id ".png"])
endfunction