"""created users, songs and playlist tables

Revision ID: 471c6b04b3bd
Revises: 
Create Date: 2021-07-27 14:39:35.697065

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '471c6b04b3bd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('playlist_name', sa.String(length=40), nullable=True),
    sa.Column('playlist_image_url', sa.String(length=255), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('api_id', sa.String(length=255), nullable=False),
    sa.Column('song_name', sa.String(length=255), nullable=False),
    sa.Column('artist_name', sa.String(length=255), nullable=False),
    sa.Column('image_url', sa.String(length=500), nullable=False),
    sa.Column('duration_ms', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('api_id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('avatar', sa.String(length=500), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('songs')
    op.drop_table('playlists')
    # ### end Alembic commands ###
