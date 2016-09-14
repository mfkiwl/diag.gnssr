* This script is designed to plot a SAR backscatter cross section
* with observations overlayed.  It can be executed using a command like
*
*     grads -blc "plot.scat.wind 2005D07-10_31545_01.00012.scat.txt.nhcjtwc"
*
* - RD April 2004.

function plot(arg)

seeboun = 1                                                        ;* view land and TC boundaries (1=yes, 0=no)
seeradi = 0                                                        ;* view the 34/50/64-kt radii lines (1=yes, 0=no)
seeradv = 0                                                        ;* view the 34/50/64-kt radii numerical values (1=yes, 0=no)
seebias = 0                                                        ;* view bias stats versus SFMR and/or GPS (1=yes, 0=no)
seevmax = 1                                                        ;* view the vmax location by closed contour (1=yes, 0=no)
left = 1                                                           ;* plotvar on lhs (1=oldv      2=newv      3=unco      4=frnk       5=hwnd)
                                                                   ;*                (6=oldv+sfmr 7=newv+sfmr 8=hwnd+sfmr 9=frnk+sfmr 10=hwnd+sfmr)
stem = substr(arg,1,25)                                            ;* but first verify that an sfmr file exists if plotting is desired
data = substr(arg,1,25)".scat.copy.nc"
datb = substr(arg,1,25)".scat.nc"
land = substr(arg,1,25)".scat.land"
btrk = substr(arg,1,25)".scat.btrk.nc"
sfmr = substr(arg,1,25)".scat.sfmr"
drop = substr(arg,1,25)".scat.gps"
sfok = 0 ; filestat = read(sfmr) ; if (sublin(filestat,1) != 0) ; say sfmr" is not available" ; else ; sfok = 1 ; filestat = close(sfmr) ; endif
drok = 0 ; filestat = read(drop) ; if (sublin(filestat,1) != 0) ; say drop" is not available" ; else ; drok = 1 ; filestat = close(drop) ; endif
* if (sfok = 0 & drok = 0) ; "quit" ; endif

fila = arg ; say "reading "fila
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lats = subwrd(line,2) ;* lats: 80
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lons = subwrd(line,2) ;* lons: 73
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_name = subwrd(line,2) ;* storm_name: OPHELIA
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_nnin = subwrd(line,2) ;* in_train_set: Yes
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hava = subwrd(line,2) ;* hwind_available: Yes
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_htrl = subwrd(line,2) ;* hwind_translated: Yes
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hpro = subwrd(line,2) ;* hwind_provider: NOAA_HRC
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_yr   = subwrd(line,2) ;* year: 2005
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_mo   = subwrd(line,2) ;* month: 9
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_dy   = subwrd(line,2) ;* day: 10
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hr   = subwrd(line,2) ;* hour: 22
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_mi   = subwrd(line,2) ;* minute: 54
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_qtim = subwrd(line,2) ;* qs_time: 22:54 UTC
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_htim = subwrd(line,2) ;* hw_time: 01:30 UTC
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_qdat = subwrd(line,2) ;* qs_date: 09/10/2005
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hdat = subwrd(line,2) ;* hw_date: 09/11/2005
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hfil = subwrd(line,2) ;* hwind_file: al16.2005_0911_01_30_marine
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_qfil = subwrd(line,2) ;* qs_l2b_ver2_file: QS_S2B32436.20070892233.CP12
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_clon = subwrd(line,2) ;* center_longitude: -90.41500 -90.42444  26.25052  26.11004
                                                    qtxt_cbon = subwrd(line,3) ;*                             -90.42444
                                                    qtxt_ilon = subwrd(line,4) ;*                                        26.25052
                                                    qtxt_ibon = subwrd(line,5) ;*                                                  26.11004
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_clat = subwrd(line,2) ;* center_latitude: 25.66250  25.63889 104.41214 104.22905
                                                    qtxt_cbat = subwrd(line,3) ;*                            25.63889
                                                    qtxt_ilat = subwrd(line,4) ;*                                     104.41214
                                                    qtxt_ibat = subwrd(line,5) ;*                                               104.22905
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_rev  = subwrd(line,2) ;* rev: 32436
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_hnum = subwrd(line,2) ;* hurrnum: 16
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_pass = subwrd(line,2) ;* pass_dir: descending
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_scan = subwrd(line,2) ;* scan_dir: descending
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lap1 = subwrd(line,2) ;* lat_plane_coefs:       39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_lap2 = subwrd(line,3) ;*                                            0.0300242960 
                                                    qtxt_lap3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_lap4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lop1 = subwrd(line,2) ;* lon_plane_coefs:       39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_lop2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_lop3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_lop4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_lai1 = subwrd(line,2) ;* index_lat_plane_coefs: 39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_lai2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_lai3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_lai4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_loi1 = subwrd(line,2) ;* index_lon_plane_coefs: 39.6219816302       0.0300242960      -0.1058863734      -0.0000308856
                                                    qtxt_loi2 = subwrd(line,3) ;*                                            0.0300242960
                                                    qtxt_loi3 = subwrd(line,4) ;*                                                              -0.1058863734
                                                    qtxt_loi4 = subwrd(line,5) ;*                                                                                 -0.0000308856
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_tang = subwrd(line,2) ;* track_angle_wind_rotate: 346.85190 -13.14810
                                                    qtxt_rota = subwrd(line,3) ;*                                    -13.14810
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_datq = subwrd(line,2) ;* qs_fulldate: 2005-07-10-1113
filestat = read(fila) ; line = sublin(filestat,2) ; qtxt_dath = subwrd(line,2) ;* hw_fulldate: 2005-07-10-1030   -43
                                                    qtxt_delh = subwrd(line,3) ;*              -43
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_datb = subwrd(line,2) ;* bt_fulldate: 2005-07-10-1200    47
                                                    btxt_delb = subwrd(line,3) ;*              47
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_file = subwrd(line,2) ;* bt_file: /home/rdanielson/data/atcf/2003/bal102003.dat
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_basn = subwrd(line,2) ;* bt_basin: AL
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_tech = subwrd(line,2) ;* bt_tech: BEST
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_tau  = subwrd(line,2) ;* bt_tau: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_clat = subwrd(line,2) ;* bt_lat: 28.5 47.301033
                                                    btxt_ilat = subwrd(line,3) ;*              47.301033
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_clon = subwrd(line,2) ;* bt_lon: -86.3 23.612263
                                                    btxt_ilon = subwrd(line,3) ;*               23.612263
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_vmax = subwrd(line,2) ;* bt_vmax: 120
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_mslp = subwrd(line,2) ;* bt_mslp: 930
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_ty   = subwrd(line,2) ;* bt_ty: HU
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_radp = subwrd(line,2) ;* bt_radp: 1010
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_rrp  = subwrd(line,2) ;* bt_rrp: 250
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_mrd  = subwrd(line,2) ;* bt_mrd: 10
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_gust = subwrd(line,2) ;* bt_gust: 155
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_eye  = subwrd(line,2) ;* bt_eye: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_regn = subwrd(line,2) ;* bt_subregion: L
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_seas = subwrd(line,2) ;* bt_maxseas: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_init = subwrd(line,2) ;* bt_initials: MISS
filestat = read(fila) ; line = sublin(filestat,2) ; btet_dir  = subwrd(line,2) ;* bt_dir: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_sped = subwrd(line,2) ;* bt_speed: 0
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_name = subwrd(line,2) ;* bt_stormname: DENNIS
filestat = read(fila) ; line = sublin(filestat,2) ; btxt_dept = subwrd(line,2) ;* bt_depth: D
filestat = read(fila) ; line = sublin(filestat,2) ; oldv_vmax = subwrd(line,2) ;* oldv_vmax: 49.86  36.19669 -64.04440   35   37
                                                    oldv_vlat = subwrd(line,3) ;*                   36.19669
                                                    oldv_vlon = subwrd(line,4) ;*                            -64.04440
                                                    oldv_vlai = subwrd(line,5) ;*                                        35
                                                    oldv_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; oldv_34ne = subwrd(line,3) ;* oldv_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    oldv_34se = subwrd(line,4) ;*                          -8999999488
                                                    oldv_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    oldv_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; oldv_50ne = subwrd(line,3) ;* oldv_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    oldv_50se = subwrd(line,4) ;*                          -8999999488
                                                    oldv_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    oldv_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; oldv_64ne = subwrd(line,3) ;* oldv_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    oldv_64se = subwrd(line,4) ;*                          -8999999488
                                                    oldv_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    oldv_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; newv_vmax = subwrd(line,2) ;* newv_vmax: 49.86  36.19669 -64.04440   35   37
                                                    newv_vlat = subwrd(line,3) ;*                   36.19669
                                                    newv_vlon = subwrd(line,4) ;*                            -64.04440
                                                    newv_vlai = subwrd(line,5) ;*                                        35
                                                    newv_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; newv_34ne = subwrd(line,3) ;* newv_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    newv_34se = subwrd(line,4) ;*                          -8999999488
                                                    newv_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    newv_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; newv_50ne = subwrd(line,3) ;* newv_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    newv_50se = subwrd(line,4) ;*                          -8999999488
                                                    newv_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    newv_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; newv_64ne = subwrd(line,3) ;* newv_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    newv_64se = subwrd(line,4) ;*                          -8999999488
                                                    newv_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    newv_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; unco_vmax = subwrd(line,2) ;* unco_vmax: 49.86  36.19669 -64.04440   35   37
                                                    unco_vlat = subwrd(line,3) ;*                   36.19669
                                                    unco_vlon = subwrd(line,4) ;*                            -64.04440
                                                    unco_vlai = subwrd(line,5) ;*                                        35
                                                    unco_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; unco_34ne = subwrd(line,3) ;* unco_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    unco_34se = subwrd(line,4) ;*                          -8999999488
                                                    unco_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    unco_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; unco_50ne = subwrd(line,3) ;* unco_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    unco_50se = subwrd(line,4) ;*                          -8999999488
                                                    unco_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    unco_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; unco_64ne = subwrd(line,3) ;* unco_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    unco_64se = subwrd(line,4) ;*                          -8999999488
                                                    unco_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    unco_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; frnk_vmax = subwrd(line,2) ;* frnk_vmax: 49.86  36.19669 -64.04440   35   37
                                                    frnk_vlat = subwrd(line,3) ;*                   36.19669
                                                    frnk_vlon = subwrd(line,4) ;*                            -64.04440
                                                    frnk_vlai = subwrd(line,5) ;*                                        35
                                                    frnk_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; frnk_34ne = subwrd(line,3) ;* frnk_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    frnk_34se = subwrd(line,4) ;*                          -8999999488
                                                    frnk_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    frnk_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; frnk_50ne = subwrd(line,3) ;* frnk_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    frnk_50se = subwrd(line,4) ;*                          -8999999488
                                                    frnk_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    frnk_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; frnk_64ne = subwrd(line,3) ;* frnk_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    frnk_64se = subwrd(line,4) ;*                          -8999999488
                                                    frnk_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    frnk_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; hwnd_vmax = subwrd(line,2) ;* hwnd_vmax: 49.86  36.19669 -64.04440   35   37
                                                    hwnd_vlat = subwrd(line,3) ;*                   36.19669
                                                    hwnd_vlon = subwrd(line,4) ;*                            -64.04440
                                                    hwnd_vlai = subwrd(line,5) ;*                                        35
                                                    hwnd_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; hwnd_34ne = subwrd(line,3) ;* hwnd_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    hwnd_34se = subwrd(line,4) ;*                          -8999999488
                                                    hwnd_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    hwnd_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; hwnd_50ne = subwrd(line,3) ;* hwnd_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    hwnd_50se = subwrd(line,4) ;*                          -8999999488
                                                    hwnd_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    hwnd_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; hwnd_64ne = subwrd(line,3) ;* hwnd_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    hwnd_64se = subwrd(line,4) ;*                          -8999999488
                                                    hwnd_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    hwnd_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; nnet_vmax = subwrd(line,2) ;* nnet_vmax: 49.86  36.19669 -64.04440   35   37
                                                    nnet_vlat = subwrd(line,3) ;*                   36.19669
                                                    nnet_vlon = subwrd(line,4) ;*                            -64.04440
                                                    nnet_vlai = subwrd(line,5) ;*                                        35
                                                    nnet_vloi = subwrd(line,6) ;*                                             37
filestat = read(fila) ; line = sublin(filestat,2) ; nnet_34ne = subwrd(line,3) ;* nnet_rad: 34 -8999999488 -8999999488 -8999999488 -8999999488
                                                    nnet_34se = subwrd(line,4) ;*                          -8999999488
                                                    nnet_34sw = subwrd(line,5) ;*                                      -8999999488
                                                    nnet_34nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; nnet_50ne = subwrd(line,3) ;* nnet_rad: 50 -8999999488 -8999999488 -8999999488 -8999999488
                                                    nnet_50se = subwrd(line,4) ;*                          -8999999488
                                                    nnet_50sw = subwrd(line,5) ;*                                      -8999999488
                                                    nnet_50nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; nnet_64ne = subwrd(line,3) ;* nnet_rad: 64 -8999999488 -8999999488 -8999999488 -8999999488
                                                    nnet_64se = subwrd(line,4) ;*                          -8999999488
                                                    nnet_64sw = subwrd(line,5) ;*                                      -8999999488
                                                    nnet_64nw = subwrd(line,6) ;*                                                  -8999999488
filestat = read(fila) ; line = sublin(filestat,2) ; best_vmax = subwrd(line,2) ;* best_vmax: 120.00  -9999.00 -9999.000 -9999 -9999
                                                    best_vlat = subwrd(line,3) ;*                    -9999.00
                                                    best_vlon = subwrd(line,4) ;*                             -9999.000
                                                    best_vlai = subwrd(line,5) ;*                                       -9999
                                                    best_vloi = subwrd(line,6) ;*                                             -9999
filestat = read(fila) ; line = sublin(filestat,2) ; best_34ne = subwrd(line,3) ;* best_rad: 34    175    200     90    115
                                                    best_34se = subwrd(line,4) ;*                        200
                                                    best_34sw = subwrd(line,5) ;*                                90
                                                    best_34nw = subwrd(line,6) ;*                                      115
filestat = read(fila) ; line = sublin(filestat,2) ; best_50ne = subwrd(line,3) ;* best_rad: 50    100     75     30     50
                                                    best_50se = subwrd(line,4) ;*                         75
                                                    best_50sw = subwrd(line,5) ;*                                30
                                                    best_50nw = subwrd(line,6) ;*                                       50
filestat = read(fila) ; line = sublin(filestat,2) ; best_64ne = subwrd(line,3) ;* best_rad: 64     25     25     15     25
                                                    best_64se = subwrd(line,4) ;*                         25
                                                    best_64sw = subwrd(line,5) ;*                                15
                                                    best_64nw = subwrd(line,6) ;*                                       25
filestat = close(fila)

*if (best_vmax < 0 | nnet_vmax < 0) ; "quit" ; endif
if ((left = 5 | left = 10) & (qtxt_hava != "Yes" & qtxt_hava != "yes"))
  say "HWind desired on LHS but unavailable" ;* quit
  if (left =  5) ; left = 2 ; endif
  if (left = 10) ; left = 7 ; endif
endif

if (qtxt_mo =  1) ; qtxt_month = "Jan" ; endif
if (qtxt_mo =  2) ; qtxt_month = "Feb" ; endif
if (qtxt_mo =  3) ; qtxt_month = "Mar" ; endif
if (qtxt_mo =  4) ; qtxt_month = "Apr" ; endif
if (qtxt_mo =  5) ; qtxt_month = "May" ; endif
if (qtxt_mo =  6) ; qtxt_month = "Jun" ; endif
if (qtxt_mo =  7) ; qtxt_month = "Jul" ; endif
if (qtxt_mo =  8) ; qtxt_month = "Aug" ; endif
if (qtxt_mo =  9) ; qtxt_month = "Sep" ; endif
if (qtxt_mo = 10) ; qtxt_month = "Oct" ; endif
if (qtxt_mo = 11) ; qtxt_month = "Nov" ; endif
if (qtxt_mo = 12) ; qtxt_month = "Dec" ; endif

"set rgb  41 255 255 255"
"set rgb  42 200 255 200"
"set rgb  43 160 205 160"
"set rgb  44 120 255 120"
"set rgb  45  80 155  80"
"set rgb  46  40 255  40"
"set rgb  47 200 200 255"
"set rgb  48 160 160 205"
"set rgb  49 120 120 255"
"set rgb  50  80  80 155"
"set rgb  51  40  40 255"
"set rgb  52 255 200 200"
"set rgb  53 205 160 160"
"set rgb  54 255 120 120"
"set rgb  55 155  80  80"
"set rgb  56 255  40  40"
"set rgb  88   0   0 208" ;* default best track colour
"set rgb  99 210 210 210" ;* default land colour

gridpoints = 50
qtxt_ibai = math_format('%.0f',qtxt_ibat)
qtxt_iboi = math_format('%.0f',qtxt_ibon)
minbat = qtxt_ibai - gridpoints; maxbat = qtxt_ibai + gridpoints
minbon = qtxt_iboi - gridpoints; maxbon = qtxt_iboi + gridpoints
if (minbat < 1) ; minbat = 1 ; endif ; if (maxbat > qtxt_lats) ; maxbat = qtxt_lats ; endif
if (minbon < 1) ; minbon = 1 ; endif ; if (maxbon > qtxt_lons) ; maxbon = qtxt_lons ; endif
*say minbat" "qtxt_ibai" "maxbat" "maxbat-minbat
*say minbon" "qtxt_iboi" "maxbon" "maxbon-minbon

pixelsize = 4.5 * (maxbon - minbon) / (2 * gridpoints)
xpic = 2 ; string = "0.50 10.50 "pixelsize" "xpic ; inner_decomp(string)
a = 1 ; while (a <= xpic) ; lef.a = _retlef.a ; clr.a = _retmid.a ; rig.a = _retrig.a ; a = a + 1 ; endwhile

pixelsize = 4.5 * (maxbat - minbat) / (2 * gridpoints)
ypic = 1 ; string = "1.20 6.20 "pixelsize" "ypic ; inner_decomp(string)
a = 1 ; while (a <= ypic) ; bot.a = _retlef.a ; cbt.a = _retmid.a ; top.a = _retrig.a ; a = a + 1 ; endwhile

a = 1 ; while (a <= xpic)
  b = 1 ; while (b <= ypic)
    vpage.a.b = lef.a" "rig.a" "bot.b" "top.b
  b = b + 1 ; endwhile
a = a + 1 ; endwhile

"sdfopen "data
"sdfopen "datb
"sdfopen "btrk
"set x "minbon" "maxbon
"set y "minbat" "maxbat
"set mproj off"
"set grid off"
"set mpdraw off"
"set clopts 1 4 .08"
"set xlopts 1 4 .095"
"set ylopts 1 4 .095"
"set digsiz 0.05"
defa = "D2R = 3.141592654 / 180.0" ; "define "defa

if (left = 1 | left =  6) ; plotvar =     "qs_spd_orig.2*1.94384" ; endif
if (left = 2 | left =  7) ; plotvar =   "qs_spd_ku2010.2*1.94384" ; endif
if (left = 3 | left =  8) ; plotvar = "qs_spduncorr_ku.2*1.94384" ; endif
if (left = 4 | left =  9) ; plotvar = "firstrankspd_ku.2*1.94384" ; endif
if (left = 5 | left = 10) ; plotvar =           "hwspd.2*1.94384" ; endif
"set parea "vpage.1.1
"set xlab off"
"set ylab off"
"set grads off" ; "set clab off" ; "d "plotvar
"run basemapscat "land" 99 1"
"set grads off" ; "set clab off" ; "set ccolor 15" ; "set cstyle 3" ; "d qs_lat"
"set grads off" ; "set clab off" ; "set ccolor 15" ; "set cstyle 3" ; "d qs_lon"
"set gxout grfill"
"set ccols  41  42  43  44  45  46  47  48  49  50  51  52  53  54  55  56"
"set clevs    10  15  20  25  30  34  40  45  50  55  64  83  96  113 137"
"set grads off" ; "set clab off" ; "d "plotvar
"q gxinfo" ; _gxinfo = result ; "q shades" ; _shades = result
"set gxout vector"
"set arrlab off" ; "set arrscl 0.08" ; "set arrowhead 0.02"
"set ccolor 1"
if (left = 1 | left =  6) ;   "d sin(skip(qs_dir_orig*D2R,4,4));cos(qs_dir_orig*D2R)"   ; endif
if (left = 2 | left =  7) ; "d sin(skip(qs_dir_ku2010*D2R,4,4));cos(qs_dir_ku2010*D2R)" ; endif
if (left = 3 | left =  8) ; "d sin(skip(qs_dir_ku2010*D2R,4,4));cos(qs_dir_ku2010*D2R)" ; endif
if (left = 4 | left =  9) ; "d sin(skip(qs_dir_ku2010*D2R,4,4));cos(qs_dir_ku2010*D2R)" ; endif
if (left = 5 | left = 10) ;         "d sin(skip(hwdir*D2R,4,4));cos(hwdir*D2R)"         ; endif
if (seeradv = 0) ; "run disp_scat_latlon 0.08 1 1 1 1" ; endif
if (seeradv = 1) ; "run disp_scat_latlon 0.08 1 0 1 1" ; endif
"set line 1 1 10" ; "run gui_track_scat 3 blats.3 blons.3 1 0.02 0.0 3"
"q gr2xy "qtxt_ibon" "qtxt_ibat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
"set line 1 1 5" ; "draw mark 9 "obsx" "obsy" 0.15" ; "set line 1 1 5"
"set line 0 1 5" ; "draw mark 9 "obsx" "obsy" 0.05" ; "set line 1 1 5"
"q gr2xy "btxt_ilon" "btxt_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
"set line 1 1 5" ; "draw mark 3 "obsx" "obsy" 0.09" ; "set line 1 1 5"
"set line 0 1 5" ; "draw mark 3 "obsx" "obsy-0.001" 0.03" ; "set line 1 1 5"
if (left < 6 & seeradi = 1)
                              "run "substr(arg,1,30)".rad."substr(arg,36,7)".best"
  if (left = 1 | left =  6) ; "run "substr(arg,1,30)".rad."substr(arg,36,7)".oldv" ; endif
  if (left = 2 | left =  7) ; "run "substr(arg,1,30)".rad."substr(arg,36,7)".newv" ; endif
  if (left = 3 | left =  8) ; "run "substr(arg,1,30)".rad."substr(arg,36,7)".unco" ; endif
  if (left = 4 | left =  9) ; "run "substr(arg,1,30)".rad."substr(arg,36,7)".frnk" ; endif
  if (left = 5 | left = 10) ; "run "substr(arg,1,30)".rad."substr(arg,36,7)".hwnd" ; endif
endif
if (seeboun = 1)
  if (left = 1 | left =  6) ; "set cthick 10" ; "set ccolor 0" ; "set clevs 1.5" ; "d     qs_spd_orig" ; "set cthick 3" ; endif
  if (left = 2 | left =  7) ; "set cthick 10" ; "set ccolor 0" ; "set clevs 1.5" ; "d   qs_spd_ku2010" ; "set cthick 3" ; endif
  if (left = 3 | left =  8) ; "set cthick 10" ; "set ccolor 0" ; "set clevs 1.5" ; "d qs_spduncorr_ku" ; "set cthick 3" ; endif
  if (left = 4 | left =  9) ; "set cthick 10" ; "set ccolor 0" ; "set clevs 1.5" ; "d firstrankspd_ku" ; "set cthick 3" ; endif
  if (left = 5 | left = 10) ; "set cthick 10" ; "set ccolor 0" ; "set clevs 1.5" ; "d           hwspd" ; "set cthick 3" ; endif
  "set cthick 10" ; "set ccolor 1" ; "set clevs 0.5" ; "d ctd" ; "set cthick 3"
endif
if (seevmax = 1)
  if (left = 1 | left =  6) ; "q gr2xy "oldv_vloi" "oldv_vlai ; endif
  if (left = 2 | left =  7) ; "q gr2xy "newv_vloi" "newv_vlai ; endif
  if (left = 3 | left =  8) ; "q gr2xy "unco_vloi" "unco_vlai ; endif
  if (left = 4 | left =  9) ; "q gr2xy "frnk_vloi" "frnk_vlai ; endif
  if (left = 5 | left = 10) ; "q gr2xy "hwnd_vloi" "hwnd_vlai ; endif
  rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
  "set line 1 1 10" ; "draw mark 2 "obsx" "obsy" 0.19" ; "set line 1 1 3"
endif

*      date        latind   lonind   shftlat   shftlon  deltime  OLDV      NEWV      UNCO      FRNK      HWND      NNET    aomlcorr hhmmss  tail  slat     slon     sspd   srai
* 2005-08-27-2017 46.08990 4.49522  25.10133  -85.30766  -220  24.23835  15.25110  25.50714  24.29486  46.11256  41.29176   1.33677 201700  NO43  24.918  -84.941   32.9    6.4
* 2004-09-09-1953 40.36959 5.67666  15.89023  -73.28200  -178  27.61969  16.91154  26.40517  29.99062  29.82577  31.06194   2.06034 195300 N43RF  15.643  -72.837   26.4    9.4 20040909I.hsfmr_v2.0.nc
biassfmr = 0.0 ; biasoldv = 0.0 ; biasnewv = 0.0 ; biasunco = 0.0 ; biasfrnk = 0.0 ; biashwnd = 0.0 ; biasnnet = 0.0 ; sorcnum = 1;
numbsfmr = 0.0 ; numboldv = 0.0 ; numbnewv = 0.0 ; numbunco = 0.0 ; numbfrnk = 0.0 ; numbhwnd = 0.0 ; numbnnet = 0.0;
if (sfok = 1 & left > 5)
  "q gxinfo"
  line3 = sublin(result,3)
  line4 = sublin(result,4)
  x1 = subwrd(line3,4)
  x2 = subwrd(line3,6)
  y1 = subwrd(line4,4)
  y2 = subwrd(line4,6)
  "set clip "x1" "x2" "y1" "y2
  say "reading "sfmr
  sfmr_delh = 0 ; sfmr_numb = 0 ; sfmr_vmax = 0
  filestat = read(sfmr)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    sfmr_ilat = subwrd(line,2)
    sfmr_ilon = subwrd(line,3)
    "q w2xy "sfmr_ilon" "sfmr_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    "set line 1 1 5" ; "draw mark 3 "obsx" "obsy"  0.09" ; "set line 1 1 5"
    filestat = read(sfmr)
  endwhile
  filestat = close(sfmr)
  filestat = read(sfmr)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    sfmr_ilat = subwrd(line,2)
    sfmr_ilon = subwrd(line,3)
    sfmr_delh = sfmr_delh + subwrd(line,6) ; sfmr_numb = sfmr_numb + 1
    sfmr_tail = subwrd(line,15)
    sfmr_wtmp = subwrd(line,18)                                      ;* use either the original AOML retrieval or a correction
*   sfmr_wtmp = subwrd(line,18) - subwrd(line,13) ; if (sfmr_wspd < 0) ; sfmr_wspd = 0 ; endif
    sfmr_wspd = sfmr_wtmp * 1.94384 ; if (sfmr_wspd > sfmr_vmax) ; sfmr_vmax = sfmr_wspd ; endif
    sfmr_rain = subwrd(line,19)
    sfmr_stmp = subwrd(line,20)
    if (sorcnum = 1) ; sorc.sorcnum = sfmr_stmp ; sorcnum = 2
    else ; flag = 0 ; a = 1 ; while (a < sorcnum) ; if (sorc.a = sfmr_stmp) ; flag = 1 ; endif ; a = a + 1 ; endwhile
           if (flag = 0) ; sorc.sorcnum = sfmr_stmp ; sorcnum = sorcnum + 1 ; endif
    endif
    if                    (sfmr_wspd <  10) ; sfmr_colr = 41 ; endif
    if (sfmr_wspd >=  10 & sfmr_wspd <  15) ; sfmr_colr = 42 ; endif
    if (sfmr_wspd >=  15 & sfmr_wspd <  20) ; sfmr_colr = 43 ; endif
    if (sfmr_wspd >=  20 & sfmr_wspd <  25) ; sfmr_colr = 44 ; endif
    if (sfmr_wspd >=  25 & sfmr_wspd <  30) ; sfmr_colr = 45 ; endif
    if (sfmr_wspd >=  30 & sfmr_wspd <  34) ; sfmr_colr = 46 ; endif
    if (sfmr_wspd >=  34 & sfmr_wspd <  40) ; sfmr_colr = 47 ; endif
    if (sfmr_wspd >=  40 & sfmr_wspd <  45) ; sfmr_colr = 48 ; endif
    if (sfmr_wspd >=  45 & sfmr_wspd <  50) ; sfmr_colr = 49 ; endif
    if (sfmr_wspd >=  50 & sfmr_wspd <  55) ; sfmr_colr = 50 ; endif
    if (sfmr_wspd >=  55 & sfmr_wspd <  64) ; sfmr_colr = 51 ; endif
    if (sfmr_wspd >=  64 & sfmr_wspd <  83) ; sfmr_colr = 52 ; endif
    if (sfmr_wspd >=  83 & sfmr_wspd <  96) ; sfmr_colr = 53 ; endif
    if (sfmr_wspd >=  96 & sfmr_wspd < 113) ; sfmr_colr = 54 ; endif
    if (sfmr_wspd >= 113 & sfmr_wspd < 137) ; sfmr_colr = 55 ; endif
    if (sfmr_wspd >= 137)                   ; sfmr_colr = 56 ; endif
    "q w2xy "sfmr_ilon" "sfmr_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    "set line "sfmr_colr" 1 5" ; "draw mark 3 "obsx" "obsy"  0.05" ; "set line 1 1 5"
    quik_oldv = subwrd(line, 7) ; if (quik_oldv >= 0 & sfmr_wspd >= 0) ; biasoldv = biasoldv + quik_oldv * 1.94384 - sfmr_wspd ; numboldv = numboldv + 1 ; endif
    quik_newv = subwrd(line, 8) ; if (quik_newv >= 0 & sfmr_wspd >= 0) ; biasnewv = biasnewv + quik_newv * 1.94384 - sfmr_wspd ; numbnewv = numbnewv + 1 ; endif
    quik_unco = subwrd(line, 9) ; if (quik_unco >= 0 & sfmr_wspd >= 0) ; biasunco = biasunco + quik_unco * 1.94384 - sfmr_wspd ; numbunco = numbunco + 1 ; endif
    quik_frnk = subwrd(line,10) ; if (quik_frnk >= 0 & sfmr_wspd >= 0) ; biasfrnk = biasfrnk + quik_frnk * 1.94384 - sfmr_wspd ; numbfrnk = numbfrnk + 1 ; endif
    quik_hwnd = subwrd(line,11) ; if (quik_hwnd >= 0 & sfmr_wspd >= 0) ; biashwnd = biashwnd + quik_hwnd * 1.94384 - sfmr_wspd ; numbhwnd = numbhwnd + 1 ; endif
    quik_nnet = subwrd(line,12) ; if (quik_nnet >= 0 & sfmr_wspd >= 0) ; biasnnet = biasnnet + quik_nnet * 1.94384 - sfmr_wspd ; numbnnet = numbnnet + 1 ; endif
    filestat = read(sfmr)
  endwhile
  filestat = close(sfmr)
  sfmr_delh = sfmr_delh / sfmr_numb
endif

diasdrop = 0.0 ; diasoldv = 0.0 ; diasnewv = 0.0 ; diasunco = 0.0 ; diasfrnk = 0.0 ; diashwnd = 0.0 ; diasnnet = 0.0;
dumbdrop = 0.0 ; dumboldv = 0.0 ; dumbnewv = 0.0 ; dumbunco = 0.0 ; dumbfrnk = 0.0 ; dumbhwnd = 0.0 ; dumbnnet = 0.0;
if (drok = 1 & left > 5)
  "q gxinfo"
  line3 = sublin(result,3)
  line4 = sublin(result,4)
  x1 = subwrd(line3,4)
  x2 = subwrd(line3,6)
  y1 = subwrd(line4,4)
  y2 = subwrd(line4,6)
  "set clip "x1" "x2" "y1" "y2
  say "reading "drop
  drop_delh = 0 ; drop_numb = 0 ; drop_vmax = 0
  filestat = read(drop)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    drop_ilat = subwrd(line,2)
    drop_ilon = subwrd(line,3)
    "q w2xy "drop_ilon" "drop_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    "set line 1 1 5" ; "draw mark 3 "obsx" "obsy"  0.15" ; "set line 1 1 5"
    filestat = read(drop)
  endwhile
  filestat = close(drop)
  filestat = read(drop)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    drop_ilat = subwrd(line,2)
    drop_ilon = subwrd(line,3)
    drop_delh = drop_delh + subwrd(line,6) ; drop_numb = drop_numb + 1
    drop_tail = subwrd(line,15)
    drop_wtmp = subwrd(line,18)                                      ;* use either the original AOML retrieval or a correction
*   drop_wtmp = subwrd(line,18) - subwrd(line,13) ; if (drop_wspd < 0) ; drop_wspd = 0 ; endif
    drop_wspd = drop_wtmp * 1.94384 ; if (drop_wspd > drop_vmax) ; drop_vmax = drop_wspd ; endif
    drop_rain = subwrd(line,19)
    if                    (drop_wspd <  10) ; drop_colr = 41 ; endif
    if (drop_wspd >=  10 & drop_wspd <  15) ; drop_colr = 42 ; endif
    if (drop_wspd >=  15 & drop_wspd <  20) ; drop_colr = 43 ; endif
    if (drop_wspd >=  20 & drop_wspd <  25) ; drop_colr = 44 ; endif
    if (drop_wspd >=  25 & drop_wspd <  30) ; drop_colr = 45 ; endif
    if (drop_wspd >=  30 & drop_wspd <  34) ; drop_colr = 46 ; endif
    if (drop_wspd >=  34 & drop_wspd <  40) ; drop_colr = 47 ; endif
    if (drop_wspd >=  40 & drop_wspd <  45) ; drop_colr = 48 ; endif
    if (drop_wspd >=  45 & drop_wspd <  50) ; drop_colr = 49 ; endif
    if (drop_wspd >=  50 & drop_wspd <  55) ; drop_colr = 50 ; endif
    if (drop_wspd >=  55 & drop_wspd <  64) ; drop_colr = 51 ; endif
    if (drop_wspd >=  64 & drop_wspd <  83) ; drop_colr = 52 ; endif
    if (drop_wspd >=  83 & drop_wspd <  96) ; drop_colr = 53 ; endif
    if (drop_wspd >=  96 & drop_wspd < 113) ; drop_colr = 54 ; endif
    if (drop_wspd >= 113 & drop_wspd < 137) ; drop_colr = 55 ; endif
    if (drop_wspd >= 137)                   ; drop_colr = 56 ; endif
    "q w2xy "drop_ilon" "drop_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    "set line "drop_colr" 1 5" ; "draw mark 3 "obsx" "obsy"  0.09" ; "set line 1 1 5"
    quik_oldv = subwrd(line, 7) ; if (quik_oldv >= 0 & drop_wspd >= 0) ; diasoldv = diasoldv + quik_oldv * 1.94384 - drop_wspd ; dumboldv = dumboldv + 1 ; endif
    quik_newv = subwrd(line, 8) ; if (quik_newv >= 0 & drop_wspd >= 0) ; diasnewv = diasnewv + quik_newv * 1.94384 - drop_wspd ; dumbnewv = dumbnewv + 1 ; endif
    quik_unco = subwrd(line, 9) ; if (quik_unco >= 0 & drop_wspd >= 0) ; diasunco = diasunco + quik_unco * 1.94384 - drop_wspd ; dumbunco = dumbunco + 1 ; endif
    quik_frnk = subwrd(line,10) ; if (quik_frnk >= 0 & drop_wspd >= 0) ; diasfrnk = diasfrnk + quik_frnk * 1.94384 - drop_wspd ; dumbfrnk = dumbfrnk + 1 ; endif
    quik_hwnd = subwrd(line,11) ; if (quik_hwnd >= 0 & drop_wspd >= 0) ; diashwnd = diashwnd + quik_hwnd * 1.94384 - drop_wspd ; dumbhwnd = dumbhwnd + 1 ; endif
    quik_nnet = subwrd(line,12) ; if (quik_nnet >= 0 & drop_wspd >= 0) ; diasnnet = diasnnet + quik_nnet * 1.94384 - drop_wspd ; dumbnnet = dumbnnet + 1 ; endif
    filestat = read(drop)
  endwhile
  filestat = close(drop)
  drop_delh = drop_delh / drop_numb
endif

plotvar = "annspd.2*1.94384"
"set parea "vpage.2.1
"set xlab off"
"set ylab off"
"set grads off" ; "set clab off" ; "d "plotvar
"run basemapscat "land" 99 1"
"set grads off" ; "set clab off" ; "set ccolor 15" ; "set cstyle 3" ; "d qs_lat"
"set grads off" ; "set clab off" ; "set ccolor 15" ; "set cstyle 3" ; "d qs_lon"
"set gxout grfill"
"set ccols  41  42  43  44  45  46  47  48  49  50  51  52  53  54  55  56"
"set clevs    10  15  20  25  30  34  40  45  50  55  64  83  96  113 137"
"set grads off" ; "set clab off" ; "d "plotvar
"set gxout stat" ; "d srad_rainrate"
line = sublin(result,8) ; rrmin = subwrd(line,4) ; rrmax = subwrd(line,5) ;* say line" "rrmin" "rrmax
"set gxout contour"
if (rrmin != 0 | rrmax != 0)
  "set ccolor 1" ; "set cint 50" ; "set black -1 1"
  "set line 1 1 10" ; "set clab off" ; "d srad_rainrate"
* "set line 1 1 10" ; "set clab off" ; "d -srad_rainrate+ssmi_windspeed"
endif
"set gxout vector"
"set arrlab off" ; "set arrscl 0.08" ; "set arrowhead 0.02"
"set ccolor 1"
"d sin(skip(qs_dir_ku2010*D2R,4,4));cos(qs_dir_ku2010*D2R)"
if (seeradv = 0) ; "run disp_scat_latlon 0.08 1 1 1 1" ; endif
if (seeradv = 1) ; "run disp_scat_latlon 0.08 0 1 1 1" ; endif
"set line 1 1 10" ; "run gui_track_scat 3 blats.3 blons.3 1 0.02 0.0 3"
"q gr2xy "qtxt_ibon" "qtxt_ibat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
"set line 1 1 5" ; "draw mark 9 "obsx" "obsy" 0.15" ; "set line 1 1 5"
"set line 0 1 5" ; "draw mark 9 "obsx" "obsy" 0.05" ; "set line 1 1 5"
"q gr2xy "btxt_ilon" "btxt_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
"set line 1 1 5" ; "draw mark 3 "obsx" "obsy" 0.09" ; "set line 1 1 5"
"set line 0 1 5" ; "draw mark 3 "obsx" "obsy-0.001" 0.03" ; "set line 1 1 5"
if (left < 6 & seeradi = 1)
  "run "substr(arg,1,30)".rad."substr(arg,36,7)".best"
  "run "substr(arg,1,30)".rad."substr(arg,36,7)".nnet"
* "run "substr(arg,1,25)".scat.radi.best"
* "run "substr(arg,1,25)".scat.radi.nnet"
endif
if (seeboun = 1)
  "set cthick 10" ; "set ccolor 0" ; "set clevs 1.5" ; "d annspd" ; "set cthick 3"
  "set cthick 10" ; "set ccolor 1" ; "set clevs 0.5" ; "d ctd" ; "set cthick 3"
endif
if (seevmax = 1)
  "q gr2xy "nnet_vloi" "nnet_vlai ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
  "set line 1 1 10" ; "draw mark 2 "obsx" "obsy" 0.19" ; "set line 1 1 3"
endif

*      date        latind   lonind   shftlat   shftlon  deltime  OLDV      NEWV      UNCO      FRNK      HWND      NNET    aomlcorr hhmmss  tail  slat     slon     sspd   srai
* 2005-08-27-2017 46.08990 4.49522  25.10133  -85.30766  -220  24.23835  15.25110  25.50714  24.29486  46.11256  41.29176   1.33677 201700  NO43  24.918  -84.941   32.9    6.4
biassfmr = 0.0 ; biasoldv = 0.0 ; biasnewv = 0.0 ; biasunco = 0.0 ; biasfrnk = 0.0 ; biashwnd = 0.0 ; biasnnet = 0.0;
numbsfmr = 0.0 ; numboldv = 0.0 ; numbnewv = 0.0 ; numbunco = 0.0 ; numbfrnk = 0.0 ; numbhwnd = 0.0 ; numbnnet = 0.0;
if (sfok = 1 & left > 5)
  "q gxinfo"
  line3 = sublin(result,3)
  line4 = sublin(result,4)
  x1 = subwrd(line3,4)
  x2 = subwrd(line3,6)
  y1 = subwrd(line4,4)
  y2 = subwrd(line4,6)
  "set clip "x1" "x2" "y1" "y2
  say "reading "sfmr
  sfmr_delh = 0 ; sfmr_numb = 0 ; sfmr_vmax = 0
  filestat = read(sfmr)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    sfmr_ilat = subwrd(line,2)
    sfmr_ilon = subwrd(line,3)
    "q w2xy "sfmr_ilon" "sfmr_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    "set line 1 1 5" ; "draw mark 3 "obsx" "obsy"  0.09" ; "set line 1 1 5"
    filestat = read(sfmr)
  endwhile
  filestat = close(sfmr)
  filestat = read(sfmr)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    sfmr_ilat = subwrd(line,2)
    sfmr_ilon = subwrd(line,3)
    sfmr_delh = sfmr_delh + subwrd(line,6) ; sfmr_numb = sfmr_numb + 1
    sfmr_tail = subwrd(line,15)
    sfmr_wtmp = subwrd(line,18)                                      ;* use either the original AOML retrieval or a correction
*   sfmr_wtmp = subwrd(line,18) - subwrd(line,13) ; if (sfmr_wspd < 0) ; sfmr_wspd = 0 ; endif
    sfmr_wspd = sfmr_wtmp * 1.94384 ; if (sfmr_wspd > sfmr_vmax) ; sfmr_vmax = sfmr_wspd ; endif
    sfmr_rain = subwrd(line,19)
    if                    (sfmr_wspd <  10) ; sfmr_colr = 41 ; endif
    if (sfmr_wspd >=  10 & sfmr_wspd <  15) ; sfmr_colr = 42 ; endif
    if (sfmr_wspd >=  15 & sfmr_wspd <  20) ; sfmr_colr = 43 ; endif
    if (sfmr_wspd >=  20 & sfmr_wspd <  25) ; sfmr_colr = 44 ; endif
    if (sfmr_wspd >=  25 & sfmr_wspd <  30) ; sfmr_colr = 45 ; endif
    if (sfmr_wspd >=  30 & sfmr_wspd <  34) ; sfmr_colr = 46 ; endif
    if (sfmr_wspd >=  34 & sfmr_wspd <  40) ; sfmr_colr = 47 ; endif
    if (sfmr_wspd >=  40 & sfmr_wspd <  45) ; sfmr_colr = 48 ; endif
    if (sfmr_wspd >=  45 & sfmr_wspd <  50) ; sfmr_colr = 49 ; endif
    if (sfmr_wspd >=  50 & sfmr_wspd <  55) ; sfmr_colr = 50 ; endif
    if (sfmr_wspd >=  55 & sfmr_wspd <  64) ; sfmr_colr = 51 ; endif
    if (sfmr_wspd >=  64 & sfmr_wspd <  83) ; sfmr_colr = 52 ; endif
    if (sfmr_wspd >=  83 & sfmr_wspd <  96) ; sfmr_colr = 53 ; endif
    if (sfmr_wspd >=  96 & sfmr_wspd < 113) ; sfmr_colr = 54 ; endif
    if (sfmr_wspd >= 113 & sfmr_wspd < 137) ; sfmr_colr = 55 ; endif
    if (sfmr_wspd >= 137)                   ; sfmr_colr = 56 ; endif
    "q w2xy "sfmr_ilon" "sfmr_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    "set line "sfmr_colr" 1 5" ; "draw mark 3 "obsx" "obsy"  0.05" ; "set line 1 1 5"
    quik_oldv = subwrd(line, 7) ; if (quik_oldv >= 0 & sfmr_wspd >= 0) ; biasoldv = biasoldv + quik_oldv * 1.94384 - sfmr_wspd ; numboldv = numboldv + 1 ; endif
    quik_newv = subwrd(line, 8) ; if (quik_newv >= 0 & sfmr_wspd >= 0) ; biasnewv = biasnewv + quik_newv * 1.94384 - sfmr_wspd ; numbnewv = numbnewv + 1 ; endif
    quik_unco = subwrd(line, 9) ; if (quik_unco >= 0 & sfmr_wspd >= 0) ; biasunco = biasunco + quik_unco * 1.94384 - sfmr_wspd ; numbunco = numbunco + 1 ; endif
    quik_frnk = subwrd(line,10) ; if (quik_frnk >= 0 & sfmr_wspd >= 0) ; biasfrnk = biasfrnk + quik_frnk * 1.94384 - sfmr_wspd ; numbfrnk = numbfrnk + 1 ; endif
    quik_hwnd = subwrd(line,11) ; if (quik_hwnd >= 0 & sfmr_wspd >= 0) ; biashwnd = biashwnd + quik_hwnd * 1.94384 - sfmr_wspd ; numbhwnd = numbhwnd + 1 ; endif
    quik_nnet = subwrd(line,12) ; if (quik_nnet >= 0 & sfmr_wspd >= 0) ; biasnnet = biasnnet + quik_nnet * 1.94384 - sfmr_wspd ; numbnnet = numbnnet + 1 ; endif
    filestat = read(sfmr)
  endwhile
  filestat = close(sfmr)
  sfmr_delh = sfmr_delh / sfmr_numb
endif

diasdrop = 0.0 ; diasoldv = 0.0 ; diasnewv = 0.0 ; diasunco = 0.0 ; diasfrnk = 0.0 ; diashwnd = 0.0 ; diasnnet = 0.0;
dumbdrop = 0.0 ; dumboldv = 0.0 ; dumbnewv = 0.0 ; dumbunco = 0.0 ; dumbfrnk = 0.0 ; dumbhwnd = 0.0 ; dumbnnet = 0.0;
if (drok = 1 & left > 5)
  "q gxinfo"
  line3 = sublin(result,3)
  line4 = sublin(result,4)
  x1 = subwrd(line3,4)
  x2 = subwrd(line3,6)
  y1 = subwrd(line4,4)
  y2 = subwrd(line4,6)
  "set clip "x1" "x2" "y1" "y2
  say "reading "drop
  drop_delh = 0 ; drop_numb = 0 ; drop_vmax = 0
  filestat = read(drop)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    drop_ilat = subwrd(line,2)
    drop_ilon = subwrd(line,3)
    "q w2xy "drop_ilon" "drop_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    "set line 1 1 5" ; "draw mark 3 "obsx" "obsy"  0.15" ; "set line 1 1 5"
    filestat = read(drop)
  endwhile
  filestat = close(drop)
  filestat = read(drop)
  while (sublin(filestat,1) = 0)
    line = sublin(filestat,2)
    drop_ilat = subwrd(line,2)
    drop_ilon = subwrd(line,3)
    drop_delh = drop_delh + subwrd(line,6) ; drop_numb = drop_numb + 1
    drop_tail = subwrd(line,15)
    drop_wtmp = subwrd(line,18)                                      ;* use either the original AOML retrieval or a correction
*   drop_wtmp = subwrd(line,18) - subwrd(line,13) ; if (drop_wspd < 0) ; drop_wspd = 0 ; endif
    drop_wspd = drop_wtmp * 1.94384 ; if (drop_wspd > drop_vmax) ; drop_vmax = drop_wspd ; endif
    drop_rain = subwrd(line,19)
    if                    (drop_wspd <  10) ; drop_colr = 41 ; endif
    if (drop_wspd >=  10 & drop_wspd <  15) ; drop_colr = 42 ; endif
    if (drop_wspd >=  15 & drop_wspd <  20) ; drop_colr = 43 ; endif
    if (drop_wspd >=  20 & drop_wspd <  25) ; drop_colr = 44 ; endif
    if (drop_wspd >=  25 & drop_wspd <  30) ; drop_colr = 45 ; endif
    if (drop_wspd >=  30 & drop_wspd <  34) ; drop_colr = 46 ; endif
    if (drop_wspd >=  34 & drop_wspd <  40) ; drop_colr = 47 ; endif
    if (drop_wspd >=  40 & drop_wspd <  45) ; drop_colr = 48 ; endif
    if (drop_wspd >=  45 & drop_wspd <  50) ; drop_colr = 49 ; endif
    if (drop_wspd >=  50 & drop_wspd <  55) ; drop_colr = 50 ; endif
    if (drop_wspd >=  55 & drop_wspd <  64) ; drop_colr = 51 ; endif
    if (drop_wspd >=  64 & drop_wspd <  83) ; drop_colr = 52 ; endif
    if (drop_wspd >=  83 & drop_wspd <  96) ; drop_colr = 53 ; endif
    if (drop_wspd >=  96 & drop_wspd < 113) ; drop_colr = 54 ; endif
    if (drop_wspd >= 113 & drop_wspd < 137) ; drop_colr = 55 ; endif
    if (drop_wspd >= 137)                   ; drop_colr = 56 ; endif
    "q w2xy "drop_ilon" "drop_ilat ; rec = sublin(result,1) ; obsx = subwrd(rec,3) ; obsy = subwrd(rec,6)
    "set line "drop_colr" 1 5" ; "draw mark 3 "obsx" "obsy"  0.09" ; "set line 1 1 5"
    quik_oldv = subwrd(line, 7) ; if (quik_oldv >= 0 & drop_wspd >= 0) ; diasoldv = diasoldv + quik_oldv * 1.94384 - drop_wspd ; dumboldv = dumboldv + 1 ; endif
    quik_newv = subwrd(line, 8) ; if (quik_newv >= 0 & drop_wspd >= 0) ; diasnewv = diasnewv + quik_newv * 1.94384 - drop_wspd ; dumbnewv = dumbnewv + 1 ; endif
    quik_unco = subwrd(line, 9) ; if (quik_unco >= 0 & drop_wspd >= 0) ; diasunco = diasunco + quik_unco * 1.94384 - drop_wspd ; dumbunco = dumbunco + 1 ; endif
    quik_frnk = subwrd(line,10) ; if (quik_frnk >= 0 & drop_wspd >= 0) ; diasfrnk = diasfrnk + quik_frnk * 1.94384 - drop_wspd ; dumbfrnk = dumbfrnk + 1 ; endif
    quik_hwnd = subwrd(line,11) ; if (quik_hwnd >= 0 & drop_wspd >= 0) ; diashwnd = diashwnd + quik_hwnd * 1.94384 - drop_wspd ; dumbhwnd = dumbhwnd + 1 ; endif
    quik_nnet = subwrd(line,12) ; if (quik_nnet >= 0 & drop_wspd >= 0) ; diasnnet = diasnnet + quik_nnet * 1.94384 - drop_wspd ; dumbnnet = dumbnnet + 1 ; endif
    filestat = read(drop)
  endwhile
  filestat = close(drop)
  drop_delh = drop_delh / drop_numb
endif

"set vpage off"
"set strsiz 0.16"
"set string 1 bc 6"
"set grads off" ; inner_cbarn("1.20 0 5.50 0.44")
"draw string 5.50 0.95 Wind Speed (kt)            NHC Category"
*"set line  1 1  5" ; "draw mark 3 6.35 0.87 0.17"
*"set line  0 1  5" ; "draw mark 3 6.35 0.87 0.10"
"set line  1 3 10" ; "draw line 0.90  0.555  4.19  0.555"
"set line 11 1 10" ; "draw line 4.19  0.555  7.50  0.555"
"set line 56 1 10" ; "draw line 7.50  0.555  8.80  0.555"
"set line 46 1 10" ; "draw line 8.80  0.555 10.60  0.555"
"set line  1 1 10" ; "draw line 4.19  0.350  4.19  0.670"
"set line 11 1 10" ; "draw line 6.16  0.350  6.16  0.670"
"set line 56 1 10" ; "draw line 7.49  0.350  7.49  0.670"

"set string     1 bc 6" ; "draw string       5.5   "top.1+0.4" "qtxt_name
if (seebias = 0 | (sfok = 0 & drok = 0))
  "set string 1 br 6"
  if (left = 1 | left =  6) ; "draw string "clr.1-0.5" "top.1+0.4" JPL v2" ; endif
  if (left = 2 | left =  7) ; "draw string "clr.1-0.5" "top.1+0.4" JPL v3" ; endif
  if (left = 3 | left =  8) ; "draw string "clr.1-0.5" "top.1+0.4" JPL v3 no rain corr" ; endif
  if (left = 4 | left =  9) ; "draw string "clr.1-0.5" "top.1+0.4" JPL v3 first rank amb" ; endif
  if (left = 5 | left = 10) ; "draw string "clr.1-0.5" "top.1+0.4" H*Wind" ; endif
  if (qtxt_nnin = "Yes" | qtxt_nnin = "yes")
    "set string 9  l 6" ; "draw string "clr.2+0.2" "top.1+0.8" H*Wind Trained"
    "set string 9 bl 6" ; "draw string "clr.2+0.5" "top.1+0.4" Neural Net"
  else
    "set string 1 bl 6" ; "draw string "clr.2+0.5" "top.1+0.4" Neural Net"
  endif
  if (left = 1 | left =  6) ; spd = math_format("%.0f",oldv_vmax) ; endif
  if (left = 2 | left =  7) ; spd = math_format("%.0f",newv_vmax) ; endif
  if (left = 3 | left =  8) ; spd = math_format("%.0f",unco_vmax) ; endif
  if (left = 4 | left =  9) ; spd = math_format("%.0f",frnk_vmax) ; endif
  if (left = 5 | left = 10) ; spd = math_format("%.0f",hwnd_vmax) ; endif
  col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
  "set string "col" bl 6" ; "draw string "clr.1+0.5" "top.1+0.4" "spd" kt"
  spd = math_format("%.0f",nnet_vmax)
  col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
  "set string "col" br 6" ; "draw string "clr.2-0.5" "top.1+0.4" "spd" kt"
else
  if (sfok = 1)
    "set string     1 bc 6"
    if (left =  6) ; "draw string "clr.1-0.9" "top.1+0.4" JPLv2-SFMR" ; endif
    if (left =  7) ; "draw string "clr.1-0.9" "top.1+0.4" JPLv3-SFMR" ; endif
    if (left =  8) ; "draw string "clr.1-0.9" "top.1+0.4" JPLv3noraincorr-SFMR" ; endif
    if (left =  9) ; "draw string "clr.1-0.9" "top.1+0.4" JPLv3firstrankamb-SFMR" ; endif
    if (left = 10) ; "draw string "clr.1-0.9" "top.1+0.4" H*Wind-SFMR" ; endif
    if (qtxt_nnin = "Yes" | qtxt_nnin = "yes")
      "set string 9  l 6" ; "draw string "clr.2+0.2" "top.1+0.8" H*Wind Trained"
      "set string 9 bl 6" ; "draw string "clr.2+0.7" "top.1+0.4" NNet-SFMR"
    else
      "set string 1 bl 6" ; "draw string "clr.2+0.7" "top.1+0.4" NNet-SFMR"
    endif
    if (left =  6 & numboldv > 0) ; spd = math_format("%.1f",biasoldv/numboldv) ; endif
    if (left =  7 & numbnewv > 0) ; spd = math_format("%.1f",biasnewv/numbnewv) ; endif
    if (left =  8 & numbunco > 0) ; spd = math_format("%.1f",biasunco/numbunco) ; endif
    if (left =  9 & numbfrnk > 0) ; spd = math_format("%.1f",biasfrnk/numbfrnk) ; endif
    if (left = 10 & numbhwnd > 0) ; spd = math_format("%.1f",biashwnd/numbhwnd) ; endif
    "set string 1 bl 6" ; "draw string "clr.1+0.6" "top.1+0.4" "spd" kt"
    if (            numbnnet > 0) ; spd = math_format("%.1f",biasnnet/numbnnet) ; endif
    "set string 1 br 6" ; "draw string "clr.2-0.6" "top.1+0.4" "spd" kt"
  endif
  if (drok = 1)
    "set string     1 bc 6"
    if (left =  6) ; "draw string "clr.1-0.9" "top.1+0.7" JPLv2-DROP" ; endif
    if (left =  7) ; "draw string "clr.1-0.9" "top.1+0.7" JPLv3-DROP" ; endif
    if (left =  8) ; "draw string "clr.1-0.9" "top.1+0.7" JPLv3noraincorr-DROP" ; endif
    if (left =  9) ; "draw string "clr.1-0.9" "top.1+0.7" JPLv3firstrankamb-DROP" ; endif
    if (left = 10) ; "draw string "clr.1-0.9" "top.1+0.7" H*Wind-DROP" ; endif
    if (qtxt_nnin = "Yes" | qtxt_nnin = "yes")
      "set string 9  l 6" ; "draw string "clr.2+0.2" "top.1+0.8" H*Wind Trained"
      "set string 9 bl 6" ; "draw string "clr.2+0.7" "top.1+0.7" NNet-DROP"
    else
      "set string 1 bl 6" ; "draw string "clr.2+0.7" "top.1+0.7" NNet-DROP"
    endif
    if (left =  6 & dumboldv > 0) ; spd = math_format("%.1f",diasoldv/dumboldv) ; endif
    if (left =  7 & dumbnewv > 0) ; spd = math_format("%.1f",diasnewv/dumbnewv) ; endif
    if (left =  8 & dumbunco > 0) ; spd = math_format("%.1f",diasunco/dumbunco) ; endif
    if (left =  9 & dumbfrnk > 0) ; spd = math_format("%.1f",diasfrnk/dumbfrnk) ; endif
    if (left = 10 & dumbhwnd > 0) ; spd = math_format("%.1f",diashwnd/dumbhwnd) ; endif
    "set string 1 bl 6" ; "draw string "clr.1+0.6" "top.1+0.7" "spd" kt"
    if (            dumbnnet > 0) ; spd = math_format("%.1f",diasnnet/dumbnnet) ; endif
    "set string 1 br 6" ; "draw string "clr.2-0.6" "top.1+0.7" "spd" kt"
  endif
endif

"set string 1 l 6"
"draw string 2.2 7.9 QuikSCAT"
"set line  1 1  5" ; "draw mark 9 1.75 7.90 0.20"
"set line  0 1  5" ; "draw mark 9 1.75 7.899 0.09"
"set string 1 r 6"
"draw string 10.5 7.9 "qtxt_datq

"set string 1 l 6"
"draw string 2.2 7.6 Best Track ("btxt_ty")"
"set line  1 1  5" ; "draw mark 3 1.75 7.60 0.17"
"set line  0 1  5" ; "draw mark 3 1.75 7.60 0.10"
spd = math_format("%.0f",best_vmax)
col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
"set string "col" c 6" ; "draw string 5.5 7.6 "spd" kt"
"set string 1 r 6"
if (btxt_delb > 0) ; "draw string 10.5 7.6 (+"btxt_delb"mi) "btxt_datb ; endif
if (btxt_delb = 0) ; "draw string 10.5 7.6                  "btxt_datb ; endif
if (btxt_delb < 0) ; "draw string 10.5 7.6 (" btxt_delb"mi) "btxt_datb ; endif
* else               ; "draw string 10.5 7.6 (" btxt_delb"mi) "btxt_datb ; endif

if (qtxt_hava = "Yes" | qtxt_hava = "yes")
  "set string 1 l 6"
  if (qtxt_hpro = "NOAA_HRC") ; qtxt_hpro = "HRD" ; endif
  "draw string 2.2 7.3 H*Wind by "qtxt_hpro
  spd = math_format("%.0f",hwnd_vmax)
  col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
  "set string "col" c 6" ; "draw string 5.5 7.3 "spd" kt"
  "set string 1 r 6"
  if (qtxt_delh > 0) ; "draw string 10.5 7.3 (+"qtxt_delh"mi) "qtxt_dath ; endif
  if (qtxt_delh = 0) ; "draw string 10.5 7.3                  "qtxt_dath ; endif
  if (qtxt_delh < 0) ; "draw string 10.5 7.3 (" qtxt_delh"mi) "qtxt_dath ; endif
* else               ; "draw string 10.5 7.3 (" qtxt_delh"mi) "qtxt_dath ; endif
endif

if (sfok = 1 & left > 5)
  "set string 1 l 6"
  "draw string 2.2 7.0 NOAA SFMR" ;*sfmr_tail
  spd = math_format("%.0f",sfmr_vmax)
  col = 1 ; if (spd > 33 & spd < 64) ; col = 11 ; endif ; if (spd > 63 & spd < 96) ; col = 56 ; endif ; if (spd > 95) ; col = 46 ; endif
  "set string "col" c 6" ; "draw string 5.5 7.0 "spd" kt"
  "set string 1 r 6"
  sfmr_delh = math_format("%.0f",sfmr_delh)
  if (sfmr_delh > 0) ; "draw string 10.5 7.0 (+"sfmr_delh"mi)                   "
  else               ; "draw string 10.5 7.0 (" sfmr_delh"mi)                   " ; endif
endif

"set string 1 c 6"
"set strsiz 0.10" ; xpos = 5.5 ; ypos = 8.4 ; ydel = 0.15
*a = 1 ; while (a < sorcnum) ; "draw string "xpos" "ypos" "sorc.a ; ypos = ypos - ydel ; a = a + 1 ; endwhile
**string = oldv_34sw" "oldv_50sw" "oldv_64sw" "lef.1-0.4" "bot.1+0.3 ; inner_radii(string)
**string = oldv_34nw" "oldv_50nw" "oldv_64nw" "lef.1-0.4" "top.1+0.2 ; inner_radii(string)
**string = oldv_34ne" "oldv_50ne" "oldv_64ne" "rig.1+0.2" "top.1+0.2 ; inner_radii(string)
**string = oldv_34se" "oldv_50se" "oldv_64se" "rig.1+0.2" "bot.1+0.3 ; inner_radii(string)
if (seeradv = 1)
  if (left = 1 | left =  6)
    string = oldv_34sw" "oldv_50sw" "oldv_64sw" "lef.1-0.3" "bot.1+0.7 ; inner_radii(string)
    string = oldv_34nw" "oldv_50nw" "oldv_64nw" "lef.1-0.3" "top.1-0.2 ; inner_radii(string)
    string = oldv_34ne" "oldv_50ne" "oldv_64ne" "rig.1+0.1" "top.1-0.2 ; inner_radii(string)
    string = oldv_34se" "oldv_50se" "oldv_64se" "rig.1+0.1" "bot.1+0.7 ; inner_radii(string)
  endif
  if (left = 2 | left =  7)
    string = newv_34sw" "newv_50sw" "newv_64sw" "lef.1-0.3" "bot.1+0.7 ; inner_radii(string)
    string = newv_34nw" "newv_50nw" "newv_64nw" "lef.1-0.3" "top.1-0.2 ; inner_radii(string)
    string = newv_34ne" "newv_50ne" "newv_64ne" "rig.1+0.1" "top.1-0.2 ; inner_radii(string)
    string = newv_34se" "newv_50se" "newv_64se" "rig.1+0.1" "bot.1+0.7 ; inner_radii(string)
  endif
  if (left = 3 | left =  8)
    string = unco_34sw" "unco_50sw" "unco_64sw" "lef.1-0.3" "bot.1+0.7 ; inner_radii(string)
    string = unco_34nw" "unco_50nw" "unco_64nw" "lef.1-0.3" "top.1-0.2 ; inner_radii(string)
    string = unco_34ne" "unco_50ne" "unco_64ne" "rig.1+0.1" "top.1-0.2 ; inner_radii(string)
    string = unco_34se" "unco_50se" "unco_64se" "rig.1+0.1" "bot.1+0.7 ; inner_radii(string)
  endif
  if (left = 4 | left =  9)
    string = frnk_34sw" "frnk_50sw" "frnk_64sw" "lef.1-0.3" "bot.1+0.7 ; inner_radii(string)
    string = frnk_34nw" "frnk_50nw" "frnk_64nw" "lef.1-0.3" "top.1-0.2 ; inner_radii(string)
    string = frnk_34ne" "frnk_50ne" "frnk_64ne" "rig.1+0.1" "top.1-0.2 ; inner_radii(string)
    string = frnk_34se" "frnk_50se" "frnk_64se" "rig.1+0.1" "bot.1+0.7 ; inner_radii(string)
  endif
  if (left = 5 | left = 10)
    string = hwnd_34sw" "hwnd_50sw" "hwnd_64sw" "lef.1-0.3" "bot.1+0.7 ; inner_radii(string)
    string = hwnd_34nw" "hwnd_50nw" "hwnd_64nw" "lef.1-0.3" "top.1-0.2 ; inner_radii(string)
    string = hwnd_34ne" "hwnd_50ne" "hwnd_64ne" "rig.1+0.1" "top.1-0.2 ; inner_radii(string)
    string = hwnd_34se" "hwnd_50se" "hwnd_64se" "rig.1+0.1" "bot.1+0.7 ; inner_radii(string)
  endif
  string = nnet_34sw" "nnet_50sw" "nnet_64sw" "lef.2-0.1" "bot.1+0.7 ; inner_radii(string)
  string = nnet_34nw" "nnet_50nw" "nnet_64nw" "lef.2-0.1" "top.1-0.2 ; inner_radii(string)
  string = nnet_34ne" "nnet_50ne" "nnet_64ne" "rig.2+0.3" "top.1-0.2 ; inner_radii(string)
  string = nnet_34se" "nnet_50se" "nnet_64se" "rig.2+0.3" "bot.1+0.7 ; inner_radii(string)
endif

if (left =  1) ; plotnam = "plot."stem".oldv" ; endif
if (left =  2) ; plotnam = "plot."stem".newv" ; endif
if (left =  3) ; plotnam = "plot."stem".unco" ; endif
if (left =  4) ; plotnam = "plot."stem".frnk" ; endif
if (left =  5) ; plotnam = "plot."stem".hwnd" ; endif
if (left =  6) ; plotnam = "plot."stem".oldv.sfmr" ; endif
if (left =  7) ; plotnam = "plot."stem".newv.sfmr" ; endif
if (left =  8) ; plotnam = "plot."stem".unco.sfmr" ; endif
if (left =  9) ; plotnam = "plot."stem".frnk.sfmr" ; endif
if (left = 10) ; plotnam = "plot."stem".hwnd.sfmr" ; endif
#"run gui_print_colour "plotnam
say "printim "plotnam".gif gif white x1100 y850"
    "printim "plotnam".gif gif white x1100 y850"
*if (best_vmax < 0 | nnet_vmax < 0) ; "!echo mv "plotnam".gif limbop >> xcop" ; endif
"quit"


function inner_radii(args)
  r34 = subwrd(args,1)
  r50 = subwrd(args,2)
  r64 = subwrd(args,3)
  xpo = subwrd(args,4)
  ypo = subwrd(args,5)

  "draw string "xpo" "ypo    " "r34
  "draw string "xpo" "ypo-0.3" "r50
  "draw string "xpo" "ypo-0.6" "r64
return

function inner_decomp(args)
  lef = subwrd(args,1)
  rig = subwrd(args,2)
  wid = subwrd(args,3)
  num = subwrd(args,4)

  if (num = 1)                                                     ;* anchor the midpoint of a single panel at the
    _retmid.1 = (lef + rig) / 2                                    ;* center of the outer allowable limits, or else
  else                                                             ;* anchor the midpoints of the outer two panels
    _retmid.1   = lef + wid / 2                                    ;* as far away as possible from each other and
    _retmid.num = rig - wid / 2                                    ;* linearly interpolate the midpoints of the
    a = 2                                                          ;* panels in between
    while (a < num)
      _retmid.a = (_retmid.num * (a-1) + _retmid.1 * (num-a)) / (num - 1)
      a = a + 1
    endwhile
  endif

  a = 1                                                            ;* then calculate the left and right limts
  while (a <= num)                                                 ;* of each panel
    _retlef.a = _retmid.a - wid / 2
    _retrig.a = _retmid.a + wid / 2
    a = a + 1
  endwhile

  if (num > 1)                                                     ;* now check the gap between adjacent panels
    dis = (num - 1) / (num + 1) * (_retlef.2 - _retrig.1) - 0.2    ;* and recalculate the outer two panel midpoints
    if (dis > 0)                                                   ;* so that the gap between the outer limit and
      lef = subwrd(args,1) + dis                                   ;* these panels is the same as the gap between
      rig = subwrd(args,2) - dis                                   ;* adjacent panels, then recalculate panel limits
      _retmid.1   = lef + wid / 2
      _retmid.num = rig - wid / 2
      a = 2
      while (a < num)
        _retmid.a = (_retmid.num * (a-1) + _retmid.1 * (num-a)) / (num - 1)
        a = a + 1
      endwhile

      a = 1
      while (a <= num)
        _retlef.a = _retmid.a - wid / 2
        _retrig.a = _retmid.a + wid / 2
        a = a + 1
      endwhile
    endif
  endif
return

function inner_cbarn(args)

sf=subwrd(args,1)
vert=subwrd(args,2)
xmid=subwrd(args,3)
ymid=subwrd(args,4)

if(sf='');sf=1.0;endif

*
*  Check shading information
*
*  'query shades'
  shdinfo = _shades
*say shdinfo
  if (subwrd(shdinfo,1)='None')
    say 'Cannot plot color bar: No shading information'
    return
  endif

*
*  Get plot size info
*
*"set vpage off"
*  'query gxinfo'
  result = _gxinfo
*say result
  rec2 = sublin(result,2)
  rec3 = sublin(result,3)
  rec4 = sublin(result,4)
  xsiz = subwrd(rec2,4)
  ysiz = subwrd(rec2,6)
  ylo = subwrd(rec4,4)
  xhi = subwrd(rec3,6)
  xd = xsiz - xhi

  ylolim=0.6*sf
  xdlim1=1.0*sf
  xdlim2=1.5*sf
  barsf=0.8*sf
  yoffset=0.2*sf
  stroff=0.1*sf
  strxsiz=0.17*sf
  strysiz=0.18*sf
*
*  Decide if horizontal or vertical color bar
*  and set up constants.
*
  if (ylo<ylolim & xd<xdlim1)
    say "Not enough room in plot for a colorbar"
    return
  endif
  cnum = subwrd(shdinfo,5)
*
*       logic for setting the bar orientation with user overides
*
  if (ylo<ylolim | xd>xdlim1)
    vchk = 1
    if(vert = 0) ; vchk = 0 ; endif
  else
    vchk = 0
    if(vert = 1) ; vchk = 1 ; endif
  endif
*
*       vertical bar
*

  if (vchk = 1 )

    if(xmid = '') ; xmid = xhi+xd/2 ; endif
    xwid = 0.2*sf
    ywid = 0.5*sf

    xl = xmid-xwid/2
    xr = xl + xwid
    if (ywid*cnum > ysiz*barsf)
      ywid = ysiz*barsf/cnum
    endif
    if(ymid = '') ; ymid = ysiz/2 ; endif
    yb = ymid - ywid*cnum/2
#RD    'set string 1 l 3'
    'set string 1 r 3'
    vert = 1

  else

*
*       horizontal bar
*

    ywid = 0.4
    xwid = 0.8

    if(ymid = '') ; ymid = ylo/2-ywid/2 ; endif
    yt = ymid + yoffset
    yb = ymid
    if(xmid = '') ; xmid = xsiz/2 ; endif
    if (xwid*cnum > xsiz*barsf)
      xwid = xsiz*barsf/cnum
    endif
    xl = xmid - xwid*cnum/2
    'set string 1 tc 3'
    vert = 0
  endif


*
*  Plot colorbar
*


* 'set strsiz 'strxsiz' 'strysiz
  num = 0
  while (num<cnum)
    rec = sublin(shdinfo,num+2)
*RD    rec = sublin(shdinfo,num+20)
    col = subwrd(rec,1)
    hi = subwrd(rec,3)
    if (vert)
      yt = yb + ywid
    else
      xr = xl + xwid
    endif

*   Draw the left/bottom triangle
    if (num = 0)
      if(vert = 1)
        xm = (xl+xr)*0.5
        'set line 'col
        'draw polyf 'xl' 'yt' 'xm' 'yb' 'xr' 'yt' 'xl' 'yt
        'set line 1 1 3'
        'draw line 'xl' 'yt' 'xm' 'yb
        'draw line 'xm' 'yb' 'xr' 'yt
        'draw line 'xr' 'yt' 'xl' 'yt
      else
        ym = (yb+yt)*0.5
        'set line 'col
        'draw polyf 'xl' 'ym' 'xr' 'yb' 'xr' 'yt' 'xl' 'ym
        'set line 1 1 3'
        'draw line 'xl' 'ym' 'xr' 'yb
        'draw line 'xr' 'yb' 'xr' 'yt
        'draw line 'xr' 'yt' 'xl' 'ym
      endif
    endif

*   Draw the middle boxes
    if (num!=0 & num!= cnum-1)
      'set line 'col
      'draw recf 'xl' 'yb' 'xr' 'yt
      'set line 1 1 3'
      'draw rec  'xl' 'yb' 'xr' 'yt
    endif

*   Draw the right/top triangle
    if (num = cnum-1)
      if (vert = 1)
        'set line 'col
        'draw polyf 'xl' 'yb' 'xm' 'yt' 'xr' 'yb' 'xl' 'yb
        'set line 1 1 3'
        'draw line 'xl' 'yb' 'xm' 'yt
        'draw line 'xm' 'yt' 'xr' 'yb
        'draw line 'xr' 'yb' 'xl' 'yb
      else
        'set line 'col
        'draw polyf 'xr' 'ym' 'xl' 'yb' 'xl' 'yt' 'xr' 'ym
        'set line 1 1 3'
        'draw line 'xr' 'ym' 'xl' 'yb
        'draw line 'xl' 'yb' 'xl' 'yt
        'draw line 'xl' 'yt' 'xr' 'ym
      endif
    endif

*   Put numbers under each segment of the color key
    if (num < cnum-1)
      if (vert)
#RD        xp=xr+stroff
        xp=xl-stroff
        'draw string 'xp' 'yt' 'hi
      else
        yp=yb-stroff
       'draw string 'xr' 'yp' 'hi
      endif
    endif

*   Reset variables for next loop execution
    if (vert)
      yb = yt
    else
      xl = xr
    endif
    num = num + 1
  endwhile
return


#"set mpdset novascotia"
#"d ati"
#"d cti"
#"d hwspd"
#"d hwdir"
#"d timedif"
#"d qs_spd_orig"
#"d qs_dir_orig"
#"d srad_rainrate"
#"d qs_spd_ku2010"
#"d qs_spduncorr_ku"
#"d qs_dir_ku2010"
#"d qs_rainimp_ku20"
#"d qs_lat"
#"d qs_lon"
#"d s0hhfore"
#"d s0hhaft"
#"d s0vvfore"
#"d s0vvaft"
#"d s0hhfore_lores"
#"d s0hhaft_lores"
#"d s0vvfore_lores"
#"d s0vvaft_lores"
#"d varhhfore"
#"d varhhaft"
#"d varvvfore"
#"d varvvaft"
#"d azimhhfore"
#"d azimhhaft"
#"d azimvvfore"
#"d azimvvaft"
#"d firstrankspd_ku"
#"d hwrelazimhhfore"
#"d hwrelazimhhaft"
#"d hwrelazimvvfore"
#"d hwrelazimvvaft"
#"d ctd"
#"d ssmi_timedif"
#"d ssmi_rainrate"
#"d ssmi_windspeed"
#"d ssmi_vapor"
#"d ssmi_cloud"
