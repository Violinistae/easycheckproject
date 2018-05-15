<div class="instrumentsContainer">
    <?php
    $long = 16;
    for ($i = 0; $i < $long; $i++):
    ?>
        <div id="<?php echo $i?>" class="instrumentDiv">
            <span class="instrumentImg">

            </span>
            <span class="instrumentTextPart">
                <label class="nomElemInstr">Nombre elemento</label>
                <label>Materia</label>				
            </span>
        </div>
    <?php endfor;?>
</div>