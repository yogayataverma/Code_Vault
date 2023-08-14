cu()
{
lscpu
}

mem()
{
free
}

while getopts "cpumemory" option; do
     case $option in
         c) cu
            ;;
         p) cu
            ;;
         u) cu
            ;;
         m) mem
            ;;
         e) mem
            ;;
         m) mem
            ;;
         o) mem
            ;;
         r) mem
            ;;
         y) mem
            ;;
     esac
done